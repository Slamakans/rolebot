const aliases = [];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.author.sendMessage("`vote [channel name to vote for (no spaces)] [yes/no]`").then(resolve).catch(reject);
    } else {
      let split = suffix.toLowerCase().split(" ");
      let name = split.shift();
      let type = split.shift();

      if(name && (type == "yes" || type == "no")) {
        bot.custom.polls[msg.guild.id] = bot.custom.polls[msg.guild.id] || {};
        let polls = bot.custom.polls[msg.guild.id];
        let alreadyVoted = !!polls[name].voters.find(voter => voter.user.id == msg.member.user.id);
        if(polls[name] && !alreadyVoted) {
          polls[name].voters.push(msg.member);
          if(type == "yes") {
            polls[name].inFavor += 1;
            polls[name].wantsToBeAdded.push(msg.member);
            msg.author.sendMessage("Thank you for your vote :two_hearts:");
          } else {
            polls[name].against += 1;
          }

          if(polls[name].inFavor >= polls[name].passCount) {
            msg.channel.sendMessage("Vote for `" + name + "` passed, creating channel and role\nEverybody that voted **yes** will be added automatically");
            msg.guild.createChannel(name, "text").then(channel => {
              bot.log(name + ": created");

              channel.overwritePermissions(msg.guild.roles.find(role => role.name == "@everyone"), {"READ_MESSAGES": false}).then(() => {
                bot.log(name + ": read permissions for '@everyone' set to false");

                msg.guild.createRole({name: polls[name].roleName}).then(role => {
                  bot.log(name + ": created role '" + role.name + "'");

                  bot.Config.roles[msg.guild.id] = bot.Config.roles[msg.guild.id] || {};
                  bot.Config.roles[msg.guild.id][role.id] = role.name;
                  bot.Utils.saveConfig(bot).catch(bot.log);

                  channel.overwritePermissions(role, {"READ_MESSAGES": true}).then(() => {
                    bot.log(name + ": read permissions for '" + role.name + "' set to true");

                    polls[name].wantsToBeAdded.forEach(member => {
                      member.addRole(role.id).catch(bot.log);
                    });

                    bot.log(name + ": adding members that voted in favor for the channel to '" + role.name + "'");
                    msg.channel.sendMessage("Done, adding the Yay voters to `" + role.name + "`").then(resolve).catch(reject);
                    delete bot.custom.polls[msg.guild.id][name];
                  }).catch(err => {
                    msg.channel.sendMessage("Error changing permissions for `" + role.name + "`").then(resolve).catch(reject);
                    reject(err);
                  });

                }).catch(err => {
                  msg.channel.sendMessage("Error creating role").then(resolve).catch(reject);
                  reject(err);
                });

              }).catch(err => {
                msg.channel.sendMessage("Error changing permissions for `everyone`").then(resolve).catch(reject);
                reject(err);
              });

            }).catch(err => {
              msg.channel.sendMessage("Error creating channel");
              reject(err);
            });
          } else if(polls[name].failCount > 0 && polls[name].against >= polls[name].failCount) {
            msg.channel.sendMessage("Vote for `" + name + "` failed");
            delete bot.custom.polls[msg.guild.id][name];
          } else {
            resolve();
          }
        } else {
          msg.author.sendMessage(alreadyVoted ? "You've already voted for this channel" : "No vote is currently active for the channel name: `" + name + "`").then(resolve).catch(reject);
        }
      } else {
        msg.author.sendMessage("`vote [channel name to vote for (no spaces)] [yes/no]`").then(resolve).catch(reject);
      }
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("vote", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Vote on an active poll");
module.exports.setSyntax("vote [channel name to vote for (no spaces)] [yes/no]");
module.exports.setExample("vote loli yes");
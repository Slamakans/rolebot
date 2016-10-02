const aliases = ["createpoll", "newvote", "newpoll", "addpoll"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.author.sendMessage("addvote [channel name (no spaces)] [role name (spaces allowed)] [pass count] [fail count]").then(resolve).catch(reject);
    } else {
      let split = suffix.split(" ");
      let channelName = split.shift().toLowerCase();
      let failCount = split.pop();
      let passCount = split.pop();
      let roleName = split.join(" ");

      if(channelName && failCount && passCount && roleName) {
        bot.custom.polls[msg.guild.id] = bot.custom.polls[msg.guild.id] || {};
        let polls = bot.custom.polls[msg.guild.id];

        if(polls[channelName]) {
          msg.author.sendMessage("There's already an ongoing poll for that channel name").then(resolve).catch(reject);
        } else {
          polls[channelName] = {channelName: channelName, roleName: roleName, passCount: passCount, failCount: failCount, inFavor: 0, against: 0, wantsToBeAdded: [], voters: []};
          msg.channel.sendMessage("`Created poll`\n" +
`**Channel Name**: ${channelName}
**Role Name**: ${roleName}

**Votes needed to pass**: ${passCount}
${failCount <= 0 ? "Vote **cannot** fail" : "Fails if **" + failCount + "** people are against it"}

_Admins can cancel using_ \`cancelvote ${channelName}\`
_Vote using_ \`vote ${channelName} yes${failCount <= 0 ? "" : "/no"}\``).then(resolve).catch(reject);
        }
      } else {
        msg.author.sendMessage("addvote [channel name (no spaces)] [role name (spaces allowed)] [pass count] [fail count]").then(resolve).catch(reject);
      }
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("addvote", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Creates a new vote for a new channel, the channel and role is automatically created");
module.exports.setSyntax("addvote [channel name (no spaces)] [role name (spaces allowed)] [pass count] [fail count]");
module.exports.setExample("addvote loli lolicon 5 2");
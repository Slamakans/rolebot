const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on("ready", () => {
  require("./command.js").Init(bot);
  console.log(`Bot ready and logged in as ${bot.user.username}`);
  /*var wantedUsername = "Slave Carer";
  if(bot.user.username != wantedUsername) {
    bot.user.setUsername(wantedUsername).then(() => console.log("Set username to " + bot.user.username)).catch(console.log);
  }
  bot.user.setAvatar(require("fs").readFileSync("avatar.jpg"))
     .then(user => console.log("Avatar set"))
     .catch(console.log);*/
})
.on("disconnected", () => {
  console.log(`Bot disconnected`);
  throw "Bot disconnected";
})
.on("message", (msg) => {
  if(msg.author.id == bot.user.id) return;
  if(!msg.guild) {
    msg.author.sendMessage("Please don't harass me in DM");
    return;
  }

  if(msg.channel.id == "229638985566126080") return;

  var prefix = bot.getPrefix(msg);
  var lowerCase = msg.content.toLowerCase();

  if(lowerCase.startsWith(prefix)){
    let identifier = lowerCase.replace(prefix, "").split(" ")[0];
    let suffix = msg.content.replace(`${prefix}${identifier}`, "").trim();
    suffix = suffix ? suffix : undefined;

    if(bot.Utils.commandExists(identifier)){
      bot.Utils.getCommand(identifier)
        .then(command => {
          console.log(command.usableBy);
          if(!command.usableBy || command.usableBy(msg)) {
            console.log(command.execute);
            command.execute(bot, msg, suffix)
              .then(() => {
                bot.Utils.aliasToIdentifier(identifier).then((id) => bot.log(`${msg.author.username} executed ${id}`));
              })
              .catch(console.log);
          } else {
            msg.author.sendMessage(Math.random() > .5 ? "Sorry mate, admin use only" : "_That's not how this works you little shit_").then(() => {
              bot.log(`${msg.author.username} tried to execute ${id} but does not have the permissions to do so`);
            }).catch(() => {
              bot.log(`${msg.author.username} tried to execute ${id} but does not have the permissions to do so`);
            });
          }
        });
    }
  }
});

bot.custom = {};
bot.custom.cachedCommands = {};
bot.custom.isAdmin = function(msg) {
  if(msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") || msg.member.hasPermission("ADMINISTRATOR")) return true;
  // console.log(msg.author.username + " is not an admin according to the permission check...");
  bot.Config.admins[msg.guild.id] = bot.Config.admins[msg.guild.id] || [];
  return ~bot.Config.admins[msg.guild.id].indexOf(msg.author.id);
  // I forgot the ES6 way to do it don't kill me, I do shit like this a lot ok fuck me aight
}

bot.Utils = require('./utils.js');
bot.Utils.addSomeFunctionsToBot(bot);

bot.Utils.getJSON('prefix_config.json')
  .then(object => {
    bot.PrefixConfig = object;
    bot.log = bot.Utils.log;

    bot.Utils.updateCommandList();
  })
  .then(() => {
    bot.Utils.getJSON("config.json")
      .then(object => {
        bot.Config = object;
        bot.login(bot.Config.auth.token);
      }).catch(console.log);
  })
  .then(() => {
    bot.Utils.getJSON("polls.json")
      .then(object => {
        bot.custom.polls = object;
      }).catch((err) => {
        console.log(err);
        bot.custom.polls = {};
      });
  })
  .then(() => {
    bot.Utils.getJSON("slaves.json")
      .then(object => {
        bot.custom.slaves = object;
      }).catch((err) => {
        console.log(err);
        bot.custom.slaves = {};
      });
  });


process.on("uncaughtException", (err) => {
  console.log(`Caught an exception: ${err.stack}`);
});

bot.on("error", console.log);
bot.on("warn", console.log);
bot.on("debug", console.log);


setInterval(() => bot.Utils.savePolls(bot), 300000);
setInterval(() => bot.Utils.saveSlaves(bot), 300000);
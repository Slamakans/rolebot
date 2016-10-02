const aliases = ["makeadmin", "setadmin"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(msg.mentions.users[0]) {
      bot.Config.admins[msg.guild.id] = bot.Config.admins[msg.guild.id] || [];
      bot.Config.admins[msg.guild.id].push(msg.mentions.users[0].id);
      bot.Utils.saveConfig(bot).then(() => {
        msg.channel.sendMessage(":revolving_hearts: _A new master_ :revolving_hearts:").then(resolve).catch(reject);
      }).catch(reject);
    } else {
      msg.author.sendMessage("`giveadmin [mention]`").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("giveadmin", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Makes the specified user an admin of the bot");
module.exports.setSyntax("giveadmin [mention]");
module.exports.setExample("giveadmin @Slamakans");
const aliases = ["remadmin", "killadmin", "fuckadmin", "dieadmin", "remouladsås"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(msg.mentions.users[0]) {
      bot.Config.admins[msg.guild.id] = (bot.Config.admins[msg.guild.id] || []).filter(id => id != msg.mentions.users[0].id);
      bot.Utils.saveConfig(bot).then(() => {
        msg.channel.sendMessage("It's not like I liked that master anyways, hmph").then(resolve).catch(reject);
      }).catch(reject);
    } else {
      msg.author.sendMessage("`killadmin [mention]`").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("removeadmin", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Revokes admin privileges from the specified user");
module.exports.setSyntax("killadmin [mention]");
module.exports.setExample("killadmin @NotSlamakans");
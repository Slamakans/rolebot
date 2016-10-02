const aliases = ["remove", "rem"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.channel.sendMessage("rem [role id]").then(resolve).catch(reject);
      return;
    }
    
    var role = msg.guild.roles.get(suffix);
    if(!role) role = msg.guild.roles.find(role => role.name.toLowerCase() == suffix.toLowerCase());
    
    if(role) {
      bot.Config.roles[msg.guild.id] = bot.Config.roles[msg.guild.id] || {};
      delete bot.Config.roles[role.id];
      bot.Utils.saveConfig(bot).then(() => {
        msg.channel.sendMessage("Role `" + role.name + "` removed").then(resolve).catch(reject);
      }).catch(reject);
    } else {
      msg.channel.sendMessage("Couldn't find role: `" + suffix + "`").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("removerole", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Removes a role from the list of roles that people can join");
module.exports.setSyntax("rem [role id/name]");
module.exports.setExample("rem not cool guy role");
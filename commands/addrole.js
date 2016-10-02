const aliases = ["add"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.channel.sendMessage("add [role id]").then(resolve).catch(reject);
      return;
    }
    
    var role = msg.guild.roles.get(suffix);
    if(!role) role = msg.guild.roles.find(role => role.name.toLowerCase() == suffix.toLowerCase());
    
    if(role) {
      bot.Config.roles[msg.guild.id] = bot.Config.roles[msg.guild.id] || {};
      bot.Config.roles[msg.guild.id][role.id] = role.name;
      bot.Utils.saveConfig(bot).then(() => {
        msg.channel.sendMessage("Role `" + role.name + "` added").then(resolve).catch(reject);
      }).catch(reject);
    } else {
      msg.channel.sendMessage("Couldn't find role: `" + suffix + "`").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("addrole", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Adds a role to the list of roles that people can join");
module.exports.setSyntax("add [role id/name]");
module.exports.setExample("add cool guy role");
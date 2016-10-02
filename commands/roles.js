const aliases = ["listroles", "occupations", "listoccupations"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    bot.Config.roles[msg.guild.id] = bot.Config.roles[msg.guild.id] || {};
    var roles = Object.keys(bot.Config.roles[msg.guild.id]).map(key => bot.Config.roles[msg.guild.id][key]);
    if(roles.length) {
      msg.channel.sendMessage("`ROLES`\n```fix\n" + roles.join(", ") + "```\nYou can use `*`, `all` or `everything` to leave/join all of them at once, or write several at once separated by commas like this `joinrole loli, neko, rp, bdsm`").then(resolve).catch(reject);
    } else {
      msg.channel.sendMessage("No roles have been added for this server, use `add [role name/id]` to add some").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("roles", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Shows you the list of roles available");
module.exports.setSyntax("roles");
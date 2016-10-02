const aliases = ["leave", "abandon", "renounce"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.author.sendMessage("`renounce [role name]`").then(resolve).catch(reject);
    } else {
      let roles = bot.Config.roles[msg.guild.id] || {};
      let roleid = Object.keys(roles).filter(key => roles[key].toLowerCase() == suffix.toLowerCase()).shift();

      if(roleid) {
        // Figured no confirmation message was needed because the role color
        // and/or info should update nearly instantaneously
        msg.member.removeRole(roleid).catch((err) => {
          msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
          console.log(err);
        }).then(resolve);
      } else if(["*", "all", "everything"].includes(suffix)) {
        msg.member.removeRoles(Object.keys(roles)).catch((err) => {
          msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
          console.log(err);
        }).then(resolve);
      } else if(!!suffix) {
        let rs = suffix.split(",").map(s => s.trim().toLowerCase());
        let rolesToRemove = Object.keys(roles).filter(key => ~rs.indexOf(roles[key].toLowerCase()));
        if(rolesToRemove.length) {
          msg.member.removeRoles(rolesToRemove).catch((err) => {
            msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
            console.log(err);
          }).then(resolve);
        } else {
          msg.author.sendMessage("You might've misspelled the role name, you typed: `" + suffix + "`").then(resolve).catch(reject);
        }
      }
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("leaverole", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Leaves the specified role, you can use *, all or everything to leave all roles\nComma-separated also possible");
module.exports.setSyntax("leave [role name]");
module.exports.setExample(["leave *", "leave cool guy role", "leave role1, role2, role3"]);
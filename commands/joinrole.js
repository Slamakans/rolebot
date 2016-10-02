const aliases = ["join", "become"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.author.sendMessage("`become [role name]`").then(resolve).catch(reject);
    } else {
      let roles = bot.Config.roles[msg.guild.id] || {};
      let roleid = Object.keys(roles).filter(key => roles[key].toLowerCase() == suffix.toLowerCase()).shift();
      //console.log(roles);

      if(roleid) {
        // Figured no confirmation message was needed because the role color
        // and/or info should update nearly instantaneously
        msg.member.addRole(roleid).catch((err) => {
          msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
          console.log(err);
        }).then(resolve);
      } else if(["*", "all", "everything"].includes(suffix)) {
        msg.member.addRoles(Object.keys(roles)).catch((err) => {
          msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
          console.log(err);
        }).then(resolve);
      } else if(!!suffix) {
        let rs = suffix.split(",").map(s => s.trim().toLowerCase());
        let rolesToAdd = Object.keys(roles).filter(key => ~rs.indexOf(roles[key].toLowerCase()));
        if(rolesToAdd.length) {
          msg.member.addRoles(rolesToAdd).catch((err) => {
            msg.channel.sendMessage("Error :(").then(resolve).catch(reject);
            console.log(err);
          }).then(resolve);
        } else {
          msg.author.sendMessage("You might've misspelled the role name, you typed: `" + suffix + "`\nUse `roles` in the server to see all the roles.").then(resolve).catch(reject);
        }
      }
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("joinrole", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Joins the specified role, you can use *, all or everything to join all roles\nComma-separated also possible");
module.exports.setSyntax("join [role name]");
module.exports.setExample(["join *", "join cool guy role", "join role1, role2, role3"]);
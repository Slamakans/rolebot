const aliases = ["pollinfo", "pinfo", "vinfo", "votestats", "pollstats", "vstats", "pstats"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.author.sendMessage("`voteinfo [channel name (no spaces)]`").then(resolve).catch(reject);
    } else {
      let name = suffix.toLowerCase();

      if(name) {
        bot.custom.polls[msg.guild.id] = bot.custom.polls[msg.guild.id] || {};
        let polls = bot.custom.polls[msg.guild.id];
        if(polls[name]) {
          let p = polls[name];
          let channelName = p.channelName;
          let roleName = p.roleName;
          let inFavor = p.inFavor;
          let against = p.against;
          let passCount = p.passCount;
          let failCount = p.failCount;
          let voteUsing = polls[name].voters.includes(msg.member) ? "You've already voted **" + (polls[name].wantsToBeAdded.includes(msg.member) ? "yes" : "no") + "** on this" : `_Vote using_ \`vote ${channelName} yes${failCount <= 0 ? "" : "/no"}\``;
          msg.author.sendMessage(`**Channel Name**: ${channelName}
**Role Name**: ${roleName}

**In Favor**: ${inFavor}/${passCount}${failCount <= 0 ? "" : "\n**Against**: " + against + "/" + failCount}

_Admins can cancel using_ \`cancelvote ${channelName}\`
${voteUsing}`).then(resolve).catch(reject);
        } else {
          msg.author.sendMessage("No vote is currently active for the channel name: `" + name + "`").then(resolve).catch(reject);
        }
      } else {
        msg.author.sendMessage("`voteinfo [channel name (no spaces)]`").then(resolve).catch(reject);
      }
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("voteinfo", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Sends a DM with information about the specified vote");
module.exports.setSyntax("vinfo [channel name (no spaces)]");
module.exports.setExample("vinfo loli");
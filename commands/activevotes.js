const aliases = ["votes", "activepolls", "polls"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    bot.custom.polls[msg.guild.id] = bot.custom.polls[msg.guild.id] || {};
    var polls = bot.custom.polls[msg.guild.id];
    var array = Object.keys(polls).map(key => polls[key]);
    if(array.length > 0) {
      msg.channel.sendMessage("**> Active Votes <**\n" + array.map(p => p.channelName).join(", ") + "\n\n`vote [name] yes/no` to vote for one of them\n`voteinfo [name]` to get some info about it").then(resolve).catch(reject);
    } else {
      msg.channel.sendMessage("No active votes right now").then(resolve).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("activevotes", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Shows you a list of the currently active votes on this server");
module.exports.setSyntax("votes");
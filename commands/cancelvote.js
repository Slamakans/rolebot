const aliases = ["cancel", "removevote", "killvote", "removepoll", "killpoll", "cancelpoll"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    bot.custom.polls[msg.guild.id] = bot.custom.polls[msg.guild.id] || {};
    let polls = bot.custom.polls[msg.guild.id];

    if(!suffix) {
      msg.author.sendMessage("`cancelvote [channel name (no spaces)]`").then(resolve).catch(reject);
    } else if(polls[suffix.toLowerCase()]) {
      msg.channel.sendMessage("Cancelled the poll for `" + polls[suffix.toLowerCase()].channelName + "`").then(resolve).catch(reject);
      delete bot.custom.polls[msg.guild.id][suffix.toLowerCase()];
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("cancelvote", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Cancels an ongoing vote");
module.exports.setSyntax("cancel [channel name (no spaces)]");
module.exports.setExample("cancel cool-guy-lair");
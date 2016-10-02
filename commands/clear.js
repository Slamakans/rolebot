const aliases = [];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix || !parseInt(suffix)) {
      msg.author.sendMessage("Invalid argument: " + suffix).then(resolve).catch(reject);
      return;
    }

    msg.channel.fetchMessages({limit: Math.max(1, Math.min(100, parseInt(suffix)))}).then(messages => {
      messages.filter(message => message.author.id == bot.user.id).forEach(m => m.delete().catch(console.log));
    }).then(resolve).catch(reject);
  });
}

const Command = require("../command.js");
module.exports = new Command("clear", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Deletes the bot's messages");
module.exports.setSyntax("clear [amount to delete]");
module.exports.setExample("clear 5");
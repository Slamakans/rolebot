const aliases = [];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    if(!suffix) {
      msg.channel.sendMessage(`The prefix here is \`${bot.getPrefix(msg)}\``).then(resolve).catch(reject);
    } else {
      var prefix = suffix.split(" ")[0];
      bot.setPrefix(msg, prefix).then(() => {
        bot.Utils.saveJSON("prefix_config.json", bot.PrefixConfig).then(resolve).catch(reject);
      }).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("prefix", aliases, "both");
module.exports.setFunction(execute);
module.exports.setDescription("Changes the prefix for the server (spaces supported [I think...])");
module.exports.setSyntax("prefix [new prefix]");
module.exports.setExample("prefix ->");
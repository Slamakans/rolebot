const aliases = ["p", "pingaling"];

const execute = function(bot, msg, suffix){
	return new Promise((resolve, reject) => {
    msg.channel.sendMessage(["Nice", "meme", "lad", "nerd", "who even uses ping anymore come on", "wowie", "Ping!"][Math.floor(Math.random() * 7)]).then(resolve).catch(reject);
  });
}

const Command = require("../command.js");
module.exports = new Command("ping", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("You can use this to see if the bot is working");
module.exports.setSyntax("ping");
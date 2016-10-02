const aliases = ["ucl", "reloadcommandlist", "rcl"];

const execute = function(bot, msg, suffix){
  return new Promise((resolve, reject) => bot.Utils.updateCommandList().then(resolve).catch(reject));
}

const Command = require("../command.js");
module.exports = new Command("updatecommandlist", aliases, "alex");
module.exports.setFunction(execute);
module.exports.setDescription("Adds new commands to the command list, and removes deleted ones");
module.exports.setSyntax("rcl");
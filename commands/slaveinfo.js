const aliases = ["sinfo", "slavestats", "stats"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    
  });
}

const Command = require("../command.js");
module.exports = new Command("slaveinfo", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Displays the slave stats of a user, or yourself");
module.exports.setSyntax("stats [optional: mention]");
module.exports.setExample(["stats @Slamakans", "stats"]);
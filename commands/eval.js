const aliases = ["e"];

const execute = function(bot, msg, suffix) {
  return new Promise((resolve, reject) => {
    var re = /^lang:(.*?)\s/i;
    var match = suffix.match(re);
    var code = suffix;
    var lang = "";

    if(match) {
      lang = match[1];
      code = code.split(" ").slice(1).join(" ").trim();
    }

    try{
      let start = Date.now();
      let result = eval(code);
      let taken = Date.now() - start;
      msg.channel.sendMessage(
`\`INPUT\`
${bot.Utils.codeblock("js", code)}
\`OUTPUT\`
${bot.Utils.codeblock(lang, result ? result : "undefined")}
\`Took: ${taken} ms\``)
      .then(resolve).catch(reject);

    }catch(e){
      msg.channel.sendMessage(bot.Utils.codeblock("js", e.message)).then(reject).catch(reject);
    }
  });
}

const Command = require("../command.js");
module.exports = new Command("eval", aliases, "alex");
module.exports.setFunction(execute);
module.exports.setDescription("My very own eval");
module.exports.setSyntax("e [optional: lang:(highlight language)] [code]");
module.exports.setExample(["e 2+2", "e lang:fix '12345'.split().join(', ')"]);
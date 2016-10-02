const aliases = ["commands"];

const execute = function(bot, msg, suffix){
  return new Promise((resolve, reject) => {
    if(!suffix) {
      bot.Utils.getJSON("commands/command_list.json")
      .then(commandList => {
        var available = Object.keys(require("../command.js").cachedCommands).map(key => require("../command.js").cachedCommands[key]).filter(cmd => !cmd.usableBy || cmd.usableBy(msg));
        msg.channel.sendMessage("`COMMANDS`\n" + bot.Utils.codeblock("fix", available.map(cmd => cmd.name).join(", ")))
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
    } else if(bot.Utils.commandExists(suffix)) {
      bot.Utils.getCommand(suffix).then(command => {
        const Canvas = require("canvas");
        const size = {w: 640, h: 1280};
        const canvas = new Canvas(size.w, size.h);
        const ctx = canvas.getContext("2d");

        const nameFont = "45px Arial Bold";
        const nameStyle = "rgb(0, 200, 0)";
        ctx.font = nameFont;
        const nameSize = ctx.measureText(command.name);

        const labelFont = "35px Arial";
        const labelFontItalic = labelFont + " Italic";
        const labelFontBold = labelFont + " Bold";
        const labelStyle = "rgb(80, 80, 130)";

        const contentFont = "28px Arial";
        const contentFontItalic = contentFont + " Italic";;
        const contentFontBold = contentFont + " Bold";;
        const contentStyle = "rgb(120, 120, 225)";

        const namePos = {x: 25, y: 35};
        const startPos = {x: namePos.x + (nameSize.width*0.15), y: namePos.y + 40};
        const increments = {x: 0, y: 40};

        const curPos = {x: startPos.x, y: startPos.y};

        ctx.font = nameFont;
        ctx.fillStyle = nameStyle;
        ctx.fillText(command.name, namePos.x, namePos.y);

        if(command.description)
          drawElement(ctx, "Description", command.description, labelFontItalic, labelStyle, contentFont, contentStyle, curPos, increments, size);
        if(command.syntax)
          drawElement(ctx, "Usage", bot.getPrefix(msg) + command.syntax, labelFontItalic, labelStyle, contentFont, "rgb(255, 255, 255)", curPos, increments, size);
        if(command.examples)
          drawElement(ctx, "Examples", command.examples.map(e => bot.getPrefix(msg) + e).join("\n"), labelFontItalic, labelStyle, contentFont, contentStyle, curPos, increments, size);
        if(command.aliases.length)
          drawElement(ctx, "Aliases", command.aliases.join(", "), labelFontItalic, labelStyle, contentFont, contentStyle, curPos, increments, size);

        cropImageFromCanvas(ctx, canvas);
        msg.channel.sendFile(canvas.toBuffer()).then(resolve).catch(reject);
      }).catch(reject);
    } else {
      msg.channel.sendMessage("Couldn't find the command `" + suffix + "`").then(resolve).catch(reject);
    }
  });
}

function drawElement(ctx, label, content, labelFont, labelStyle, contentFont, contentStyle, pos, increment, size) {
  //console.log("Drawing " + label);
  //console.log("Content: " + content);
  ctx.font = labelFont;
  ctx.fillStyle = labelStyle;
  ctx.fillText(label, pos.x, pos.y);
  const labelSize = ctx.measureText(label);

  ctx.font = contentFont;
  ctx.fillStyle = contentStyle;
  const contentX = pos.x + 15;//pos.x + 20 + labelSize.width;
  printAtWordWrap(ctx, content, contentX, pos.y + 30, 32, size.w - contentX - 32, pos, increment);
}

// From http://stackoverflow.com/questions/6517999/how-to-justify-align-text-in-html5-canvas
// Added pos.y += blabla
function printAtWordWrap(context, text, x, y, lineHeight, fitWidth, pos, increment) {
  fitWidth = fitWidth || 0;
  lineHeight = lineHeight || 20;

  var currentLine = 0;

  var lines = text.split(/\r\n|\r|\n/);
  for (var line = 0; line < lines.length; line++) {
    if (fitWidth <= 0) {
      context.fillText(lines[line], x, y + (lineHeight * currentLine));
    } else {
      var words = lines[line].split(' ');
      var idx = 1;
      while (words.length > 0 && idx <= words.length) {
        var str = words.slice(0, idx).join(' ');
        var w = context.measureText(str).width;
        if (w > fitWidth) {
          if (idx == 1) {
            idx = 2;
          }
          context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
          currentLine++;
          words = words.splice(idx - 1);
          idx = 1;
        }
        else
        { idx++; }
      }
      if (idx > 0)
        context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
    }
    currentLine++;
  }

  pos.y += increment.y * currentLine + 40;
}

function cropImageFromCanvas(ctx, canvas) {
  var w = canvas.width,
  h = canvas.height,
  pix = {x:[], y:[]},
  imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
  x, y, index;

  for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
          index = (y * w + x) * 4;
          if (imageData.data[index+3] > 0) {

              pix.x.push(x);
              pix.y.push(y);

          }   
      }
  }
  pix.x.sort(function(a,b){return a-b});
  pix.y.sort(function(a,b){return a-b});
  var n = pix.x.length-1;

  w = (pix.x[n] - pix.x[0]) + 5;
  h = (pix.y[n] - pix.y[0]) + 5;
  var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cut, 0, 0);
}

const Command = require("../command.js");
module.exports = new Command("help", aliases);
module.exports.setFunction(execute);
module.exports.setDescription("Shows a list of the commands available for you, or help about a specific command, but you probably know that already since you're seeing this");
module.exports.setSyntax("help [optional: commandname]");
module.exports.setExample("help join");
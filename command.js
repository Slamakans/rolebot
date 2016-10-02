var bot;

class Command {
  constructor(name, aliases, type) {
    this.name = name;
    this.aliases = aliases || [];
    this.usableBy = type == "alex" ? (msg) => {return msg.author.id == "114758367905447939"} :
                     type == "admin" ? (msg) => {return bot.custom.isAdmin(msg)} :
                     type == "both" ? (msg) => {return msg.author.id == "114758367905447939" || bot.custom.isAdmin(msg)}
                     : undefined;

    this.setEnabled(true);
    Command.cachedCommands[this.name] = this;
  }

  setFunction(func) {
    this.execute = func;
  }

  setDescription(description) {
    this.description = description;
  }

  setExample(examples) {
    this.examples = Array.isArray(examples) ? examples : [examples];
  }

  setSyntax(syntax) {
    this.syntax = syntax;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  static Init(botClient) {
    console.log("Initialized command.js");
    bot = botClient;
  }
}
Command.cachedCommands = {};
module.exports = Command;
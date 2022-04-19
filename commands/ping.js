const Discord = require("discord.js");

module.exports.help = {
  name: "ping",
  description: "bot ws",
};

module.exports.limits = {
  rateLimit: 5,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  return message.reply(`\`🏓\` ${client.ws.ping} ws ping`);
};

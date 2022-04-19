const Discord = require("discord.js");

module.exports.help = {
  name: "help",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 5,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  const { commands } = message.client;
  const embed = new Discord.MessageEmbed()
    .setTitle("Available Commands")
    .setDescription(
      `
**Bitrate** - Pengaturan pada bitrate
**ChannelInfo** - Mengetahui config channel saat ini
**Claim** - Mengambil alih channel ketika channel master keluar
**Limit** - Pengaturan size user yang diizinkan bergabung
**Name** - Manage nama channelmu
**Region** - Pengaturan region voice channelmu
**Transfer** - Kirim alih channel ke siapapun
**Voice** - Mencari user di dalam voice channel
    `
    )
    .addField(
      "Other Commands",
      `
**Help** - Perintah yang tersedia
**Ping** - Bot websocket
**Status** - Bot config status
    `
    )
    .setFooter({ text: "Stay Connect With Vibes!" })
    .setColor("#ffde59");
  return message.channel.send({ embeds: [embed] });
};

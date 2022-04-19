const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports.help = {
  name: "bitrate",
  description: "setting up channel bitrate",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.reply("❌ Create your own channel first!");
  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply("❌ I dont have authority to manage");

  if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
    return message.reply("<:Locked:878090820912295967> Channel is owned");

  if (!args.length || isNaN(args[0]))
    return message.reply("❌ Please input the bitrate number");

  const guildLevel = message.guild.premiumTier;
  let bitrate = args.join(" ") || isNaN(args[0]);
  if (!bitrate) return message.reply("Input bitrate");

  if (message.member.voice.channel) {
    if (bitrate < 8) return message.reply("❌ Cannot set bitrate < 8");
    if (guildLevel === "NONE") {
      if (bitrate > 96)
        return message.reply(
          "❌ You cant set the bitrate higher than 96Kbps, because the server has lvl 0 boost"
        );
    }
    if (guildLevel === "TIER_1") {
      if (bitrate > 128)
        return message.reply(
          "❌ You cant set the bitrate higher than 128Kbps, because the server has lvl 1 boost"
        );
    }
    if (guildLevel === "TIER_2") {
      if (bitrate > 256)
        return message.reply(
          "❌ You cant set the bitrate higher than 256Kbps, because the server has lvl 2 boost"
        );
    }

    if (guildLevel === "TIER_3") {
      if (bitrate > 384)
        return message.reply(
          "❌ You cant set the bitrate higher than 384Kbps, because that was the mas bit"
        );
    }
  }

  let ika = new MessageEmbed()
    .setTitle("Channel Update")
    .setDescription(`Channel bitrate update to ${bitrate}Kbps`)
    .setFooter({ text: "Stay Connect With Vibes!" })
    .setColor("#ffde59");

  await message.member.voice.channel.setBitrate(bitrate + "000");
  await message.channel.send({ embeds: [ika] });
};

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "name",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 2,
  cooldown: 600000,
  case: "You've reach rate limit",
};

module.exports.run = async (client, message, args) => {
  try {
    let channel = message.member.voice.channel;
    if (!channel) return message.reply("❌ Create your own channel first!");
    if (channel.parentId === "965192730043093062")
      return message.channel.send({
        content: "Limit command is not available in Game Generator",
      });
    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply("❌ I dont have authority to manage");
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply("❌ Channel is owned");
    if (!args[0]) return message.reply("❌ Please type new channel name");
    if (message.member.voice.channel) {
      let name = args.join(" ");
      let ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Name edited by **${message.author.username}** into **${name}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      await channel.setName(name).then(async () => {
        await message.reply({
          embeds: [ngentot],
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

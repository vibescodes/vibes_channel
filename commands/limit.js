const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "limit",
  description: "setup the voice channel limit",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  if (message.member.voice.channel) {
    let channel = message.member.voice.channel;
    if (!channel) return message.reply("❌ Create your own channel first!");
if(channel.parentId === "965194632784924672") return message.reply({content:"Limit command is not available in Private Session"})
if(channel.parentId === "965192730043093062") return message.reply({content:"Limit command is not available in Game Generator"})
    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply("❌ I dont have authority to manage");
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply("<:Locked:878090820912295967> Channel is owned");

    if (!args.length || isNaN(args[0]))
      return message.reply("❌ Please input the limit number");

    let limit = args.join(" ") || isNaN(args[0]);
    if (limit > 99)
      return message.reply(
        "❌ Please input the valid limit number 1 - 99 are available"
      );
    if (limit < 0)
      return message.reply(
        "❌ Please input the valid limit number 1 - 99 are available"
      );
    //if(limit < channel.members.size) return message.reply(`\`❌\` There has ${channel.members.size} user, you cant limit the channel under ${channel.members.size}`)
    let ika = new MessageEmbed()
      .setTitle("Channel Update")
      .setDescription(
        `Channel Limit edited by **${message.author.username}** into **${limit}**`
      )
      .setFooter({ text: "Stay Connect With Vibes!" })
      .setColor("#ffde59");

    channel.setUserLimit(limit);
    return message.channel.send({ embeds: [ika] });
  }
};

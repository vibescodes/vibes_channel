const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "channelinfo",
  description: "getting info of your channel config",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let today = new Date().toISOString().slice(0, 10);
  let channel =
    message.member.voice.channel ||
    message.channel ||
    message.mentions.channels.first() ||
    client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
    message.guild.channels.cache.find(
      (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
    );
  if (!channel) return message.reply("Please mention a Channel or ID");
  let channelembed = new MessageEmbed()
    .setTitle(`Channel Information`)
    .addField(
      "`📢` Overview",
      `\`\`\`js      
Channel Name     :: ${channel.name}
Channel Type     :: ${channel.type}
Channel Limit    :: ${channel.userLimit || "Public"}
Channel User     :: ${channel.members.size} user(s)
Channel Region   :: ${channel.region || "Automatic"}
Channel Bitrate  :: ${channel.bitrate || "No Bitrate"}
Channel Position :: ${channel.position}
Channel Descript :: ${channel.topic || "No Description"}
Channel ID       :: ${channel.id}\`\`\``
    )
    .setTimestamp()
    .setFooter({ text: "Stay Connect With Vibes!" })
    .setColor("#ffde59");
  await message.channel.send({
    embeds: [channelembed],
  });
};

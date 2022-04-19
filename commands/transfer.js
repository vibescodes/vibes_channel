const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "transfer",
  description: "transfer the channel access",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit ratea",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.reply("❌ Create your own channel first!");
  try {
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply("❌ Channel is owned");

    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply("❌ I dont have authority to manage");

    let user = message.mentions.members.first();
    if (!user)
      return message.reply(
        "<:False:823030995053576232> You should mention(**User**)"
      );

    if (user.user.bot)
      return message.reply(
        "<:False:823030995053576232> User detected as (**bot**)"
      );

    if (
      user.voice.channel === null ||
      user.voice.channel === undefined ||
      user.voice.channel !== channel
    )
      return message.reply(
        `<:False:823030995053576232> That person should join to your channel`
      );

    // async () => await channel.permissionOverwrites.delete(message.member.id);

    await channel.lockPermissions().then((add) =>
      add.permissionOverwrites.edit(user.id, {
        PRIORITY_SPEAKER: true,
      })
    );

    let ikan = new MessageEmbed()
      .setTitle("Authority Update")
      .setDescription(
        "**Note** : Hey author, i just reset the channel configuration, because channel transfer method"
      )
      .addField(
        "Transfer Rights",
        `
Previous Owner : <@${message.member.id}>
Current Author : <@${user.id}>
  `
      )
      .setFooter({ text: "Stay Connect With Vibes!" })
      .setColor("#ffde59");
    throw message.reply({
      embeds: [ikan],
    });
  } catch (err) {
    console.log(err);
  }
};

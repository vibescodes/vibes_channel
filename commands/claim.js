const { MessageEmbed } = require("discord.js");
module.exports.help = {
  name: "claim",
  description: "claim the channel",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel) return message.reply("❌ Create your own channel first!");

  const channelOwner = channel.permissionOverwrites.cache.map(
    (x) => message.guild.members.resolve(x.id)?.user.id
  );

  ikan = channelOwner.filter(function (element) {
    return element !== undefined || null;
  });

  // console.log(ikan.toString());
  // const ownership = await client.users.fetch(ikan.toString());
  const member = await message.guild.members.fetch(ikan.toString());
  // console.log(ownership);

  let channelSebelumnnya = member.voice.channel?.id;
  // console.log(sebelum);
  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply("❌ I dont have authority to manage");

  function ChannelMaster(usr) {
    if (usr.permissionsIn(channel).has("PRIORITY_SPEAKER")) {
      return usr.id || usr.author.id;
    }
  }

  const yourChannelAuthor = new MessageEmbed()
    .setDescription(
      `Bejir <@${ChannelMaster(member)}>, Channel masternya tetep kamu dong`
    )
    .setColor("BLUE");
  const ownerConnect = new MessageEmbed()
    .setDescription(
      `Maaf ya saat ini Channel masternya si <@${ChannelMaster(member)}>`
    )
    .setColor("RED");
  const ownerLeave = new MessageEmbed()
    .setDescription(
      `Okeh <@${ChannelMaster(member)}>, Karang kamu jadi channel master!`
    )
    .setColor("GREEN");

  if (member.voice.channel && message.member.id === ikan.toString()) {
    return message.channel.send({
      embeds: [yourChannelAuthor],
    });
  } else if (channel.id !== channelSebelumnnya) {
    await channel.permissionOverwrites.delete(member.id);
    await channel.lockPermissions().then((add) =>
      add.permissionOverwrites.edit(message.member, {
        PRIORITY_SPEAKER: true,
      })
    );

    return message.channel.send({
      embeds: [ownerLeave],
    });
  } else if (member.voice.channel) {
    return message.channel.send({
      embeds: [ownerConnect],
    });
  }
};

// ${channelr.permissionOverwrites.cache.map((x) => x.type === "role" ? message.guild.roles.resolve(x.id)?.name : message.guild.members.resolve(x.id)?.user.username

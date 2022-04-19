const { MessageEmbed } = require("discord.js");
module.exports.help = {
  name: "perm",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 1000,
  case: "You've reach rate limit",
};

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "<:Locked:878090820912295967> You don't have the necessary authority - `MANAGE_MESSAGES`"
    );
  if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "<:Locked:878090820912295967> Missing Permission on me - `MANAGE_MESSAGES`"
    );
  const permissions = [
    "Create Instant Invite",
    "Kick Members",
    "Ban Members",
    "Administrator",
    "Manage Channels",
    "Manage Guild",
    "Add Reactions",
    "View Audit Log",
    "Priority Speaker",
    "Stream",
    "View Channel",
    "Send Messages",
    "Send TTS Messages",
    "Manage Messages",
    "Embed Links",
    "Attach Files",
    "Read Message History",
    "Mention Everyone",
    "Use External Emojis",
    "View Guild Insights",
    "Connect",
    "Speak",
    "Mute Members",
    "Deafen Members",
    "Move Members",
    "Use VAD",
    "Change Nickname",
    "Manage Nicknames",
    "Manage Roles",
    "Manage Webhooks",
    "Use Public Threads",
    "Use Private Threads",
    "Manage Emojis And Stickers",
  ];

  //message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
  permissions.sort();
  const me = message.mentions.members.first() || message.member;
  //if (!me) return message.reply("<:False:823030995053576232> Mention the valid user on this guild")
  const yes = "`🟢`";
  const no = "`🔴`";
  let props = "";
  const permEmbed = new MessageEmbed()
    .setTitle(`${me.user.tag}'s Permissions`)
    .setThumbnail(`${me.user.displayAvatarURL()}`)

    // .setDescription(`Note: Not all permissions listed are required for the bot to fully function.\n${yes} Enabled | ${no} Disabled`)
    .setColor(`GREEN`)
    .setFooter({ text: "Stay Connect With Vibes!" });

  permissions.forEach((perm) => {
    let permName = perm.toUpperCase().replace(/ /g, "_");
    props += `${me.permissions.has(permName) ? yes : no}  ${perm}\n`;
  });
  permEmbed.setDescription(props);

  message.channel.send({ embeds: [permEmbed] });
};

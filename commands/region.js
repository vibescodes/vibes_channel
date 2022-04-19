const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.help = {
  name: "region",
  description: "setting up the channel region",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  const regions = [];
  regions[1] = "brazil";
  regions[2] = "rotterdam";
  regions[3] = "hongkong";
  regions[4] = "india";
  regions[5] = "japan";
  regions[6] = "russia";
  regions[7] = "singapore";
  regions[8] = "southafrica";
  regions[9] = "sydney";
  regions[10] = "us-central";
  regions[11] = "us-east";
  regions[12] = "us-west";
  regions[13] = "us-south";

  let channel = message.member.voice.channel;
  if (!channel) return message.reply("❌ Create your own channel first!");
  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply("❌ I dont have authority to manage");

  if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
    return message.reply("❌ Channel is owned");

  let RTCRegion = new MessageEmbed()
    .setAuthor({ name: "Region State" })
    .addField(
      "Choose the region number as a first args",
      `\`\`\`sql
1  :: brazil
2  :: rotterdam
3  :: hongkong
4  :: india
5  :: japan
6  :: russia
7  :: singapore
8  :: southafrica
9  :: sydney
10 :: us-central
11 :: us-east
12 :: us-west
13 :: us-south
\`\`\`
  `
    )

    .addField(
      "-",
      `\`\`\`sql
${config.PREFIX}region 3
${config.PREFIX}region 6

\`\`\``
    )
    .addField(
      "-",
      `\`\`\`sql
${config.PREFIX}region hongkong
${config.PREFIX}region sydney

\`\`\``
    )
    .setFooter({ text: "Stay Connect With Vibes!" })
    .setColor("#ffde59");
  // if (!args.length || isNaN(args[0]))
  //   return message.reply(
  //     "<:False:823030995053576232> Please input the region list number"
  //   );

  if (!args[0])
    return message.reply({
      embeds: [RTCRegion],
    });

  if (args[0] < 1)
    return message.reply(
      "<:False:823030995053576232> Please input the valid list number, 1 -13 are available"
    );
  if (args[0] > 13)
    return message.reply(
      "<:False:823030995053576232> Please input the valid list number, 1 - 13 are available"
    );

  if (message.member.voice.channel) {
    if (args[0] <= 1 && args[0] >= 13)
      return message.reply(
        "<:False:823030995053576232> Please input the region list number"
      );
    if (args[0] === "1" || args[0] === "brazil") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[1]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[1]);
      }
    }

    if (args[0] === "2" || args[0] === "rotterdam") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[2]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[2]);
      }
    }

    if (args[0] === "3" || args[0] === "hongkong") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[3]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[3]);
      }
    }

    if (args[0] === "4" || args[0] === "india") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[4]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[4]);
      }
    }

    if (args[0] === "5" || args[0] === "japan") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[5]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[5]);
      }
    }

    if (args[0] === "6" || args[0] === "russia") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[6]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[6]);
      }
    }

    if (args[0] === "7" || args[0] === "singapore") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[7]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[7]);
      }
    }

    if (args[0] === "8" || args[0] == "southafrica") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[8]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[8]);
      }
    }

    if (args[0] === "9" || args[0] == "sydney") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[9]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[9]);
      }
    }

    if (args[0] === "10" || args[0] === "us-central") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[10]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[10]);
      }
    }

    if (args[0] === "11" || args[0] === "us-east") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[11]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[11]);
      }
    }

    if (args[0] === "12" || args[0] === "us-west") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[12]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[12]);
      }
    }

    if (args[0] === "13" || args[0] === "us-south") {
      const ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Region edited by **${message.author.username}** into **${regions[13]}**`
        )
        .setFooter({ text: "Stay Connect With Vibes!" })
        .setColor("#ffde59");
      message.reply({
        embeds: [ngentot],
      });

      for (const [memberID, member] of channel.members) {
        message.member.voice.channel.setRTCRegion(regions[13]);
      }
    }
  }
};

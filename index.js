const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Client({
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  ],
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  rejectOnRateLimit: ["/guilds", "/channels"],
  http: {
    agent: {},
    version: 9,
    api: "https://discord.com/api",
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
    scheduledEvent: "https://discord.com/events",
  },
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
});

client.prefix = config.PREFIX;
client.commands = new Collection();
client.limits = new Map();
const command = require("./structure/commandHandler");
const events = require("./structure/event");
command.run(client);
events.run(client);

process.on("unhandledRejection", (reason, p) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Unhandled Rejection/Catch"
  );
  console.log(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch"
  );
  console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch (MONITOR)"
  );
  console.log(err, origin);
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log("\x1b[31m%s\x1b[0m", " [Anti - Crash] :: Multiple Resolves");
  console.log(type, promise, reason);
});

client.on("rateLimit", (data) => {
  console.log("GLOBAL : ", data.global);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `Rate limit hit ${
      data.timeDifference
        ? data.timeDifference
        : data.timeout
        ? data.timeout
        : "Unknown timeout "
    }`
  );
});

client.on("warn", (error) => console.table(error));
client.on("error", (error) => console.table(error));
client.on("debug", (debug) => {
  console.log("\x1b[35m%s\x1b[0m", debug);
});

//Handle AutoVoice Channel
client.on("voiceStateUpdate", async (oldState, newState) => {
  const user = await client.users.fetch(newState.id);
  if (
    newState.channel === newState.guild.channels.cache.get(config.AutoChannel)
  ) {
    newState.guild.channels
      .create(`◗ ${user.username}'s Room`, {
        type: "GUILD_VOICE",
        parent: config.AutoCategory,
      })
      .then(async (set) => {
        await newState.setChannel(newState.guild.channels.cache.get(set.id));
        await set.lockPermissions().then((add) =>
          add.permissionOverwrites.edit(newState.id, {
            PRIORITY_SPEAKER: true,
          })
        );
      });
  }
  //Handle Delete AutoVoice
  if (oldState.channel) {
    let filtered = (ch) =>
      ch.parent === newState.guild.channels.cache.get(config.AutoCategory) &&
      ch.id !== config.AutoChannel &&
      oldState.channel.id === ch.id &&
      oldState.channel.members.filter((m) => !m.user.bot).size < 1;
    return oldState.guild.channels.cache
      .filter(filtered)
      .forEach(async (ch) => await ch.delete());
  }
});

//Handle Private Category
client.on("voiceStateUpdate", async (oldState, newState) => {
  if (oldState.channel) {
    let filtered = (ch) =>
      ch.parent === newState.guild.channels.cache.get(config.PrivateCategory) &&
      ch.id !== config.PrivateChannel &&
      oldState.channel.id === ch.id &&
      oldState.channel.members.filter((m) => !m.user.bot).size < 1;
    return oldState.guild.channels.cache
      .filter(filtered)
      .forEach(async (ch) => await ch.delete());
  }
});

//Handle Game Category
client.on("voiceStateUpdate", async (oldState, newState) => {
  if (oldState.channel) {
    let filtered = (ch) =>
      ch.parent === newState.guild.channels.cache.get(config.GameCategory) &&
      ch.id !== config.GameChannel &&
      oldState.channel.id === ch.id &&
      oldState.channel.members.filter((m) => !m.user.bot).size < 1;
    return oldState.guild.channels.cache
      .filter(filtered)
      .forEach(async (ch) => await ch.delete());
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  const msg = reaction.message;
  const emoji = reaction.emoji;
  if (msg.partial) await msg.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!msg.guild) return;
  const GameChannelRoute = msg.guild.channels.cache.get(config.GameChannel); //Auto Channel Game
  const PrivateChannelRoute = msg.guild.channels.cache.get(
    config.PrivateChannel
  ); //Auto Channel Private
  const member = await msg.guild.members.fetch(user.id);
  if (msg.id === "MESSAGE_ID") {
    if (emoji.id === "EMOJI_ID" && member.voice.channel === GameChannelRoute) {
      await reaction.users.remove(user);
      await msg.channel
        .send({ content: "Load Game Channel Config" })
        .then((a) => {
          setTimeout(() => a.delete(), 3000);
        });

      await msg.guild.channels
        .create(`CHANNEL_NAME`, {
          type: "GUILD_VOICE",
          parent: GameCat,
          userLimit: 0,
        })
        .then(async (set) => {
          await member.voice.setChannel(msg.guild.channels.cache.get(set.id));
          await set.lockPermissions().then((add) =>
            add.permissionOverwrites.edit(member, {
              PRIORITY_SPEAKER: true,
            })
          );
        });
    } else {
      await reaction.users.remove(user);
      await msg.channel
        .send({
          content: "Join the Point Channel first",
        })
        .then((x) => {
          setTimeout(() => x.delete(), 3000);
        });
    }
  }
});

try {
  client.login(config.TOKEN);
} catch (error) {
  console.log("[ERROR]", error);
}

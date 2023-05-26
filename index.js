const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("guildMemberAdd", (member) => {
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === "welcome"
  );
  fetch("https://g.tenor.com/v1/random?q=welcome&key=LIVDSRZULELA&limit=8")
    .then((response) => response.json())
    .then((json) => {
      const index = Math.floor(Math.random() * json.results.length);
      const gif = json.results[index];
      welcomeChannel.send(`Welcome to the server, ${member}! \n${gif.url}`);
    });
});

client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "!advice") {
    fetch("https://api.adviceslip.com/advice").then((response) =>
      response.json().then((json) => {
        message.reply(`\n${json.slip.advice}`);
      })
    );
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "!joke") {
    fetch("https://official-joke-api.appspot.com/random_joke").then(
      (response) =>
        response.json().then((json) => {
          message.reply(`\n${json.setup}\n${json.punchline}`);
        })
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "!cat") {
    fetch("https://api.thecatapi.com/v1/images/search").then((response) =>
      response.json().then((json) => {
        message.reply(`\n${json[0].url}`);
      })
    );
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "!dog") {
    fetch("https://api.thedogapi.com/v1/images/search").then((response) =>
      response.json().then((json) => {
        message.reply(`\n${json[0].url}`);
      })
    );
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "!help") {
    message.reply(`\n!ping\n!advice\n!joke\n!meme\n!cat\n!dog\n!avatar`);
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "!avatar") {
    message.reply(`\n${message.author.displayAvatarURL()}`);
  }
});
client.login(config.token);

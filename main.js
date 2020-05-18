const Discord = require('discord.js')
const bot = new Discord.Client()
let config = require('./config.json');


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "feed":
      const m = await message.channel.send("Ping?");
      break;
    case "mvp":
      const mvp = await message.channel.send("MVP");
      break;
      
    case "scoreboard":
      const scoreboard = await message.channel.send("SCOREBOARD?");

      break;

    case "say":
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);

    default:
      break;
  }

});

bot.login(config.token);
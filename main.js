const Discord = require('discord.js')
const { v4: uuidv4 } = require('uuid');
const { addScore } = require('./util/addScore.js')
let secret = require('./config/secret.json');
const bot = new Discord.Client()

bot.login(secret.token);

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(secret.prefix) !== 0) return;

  const args = message.content.slice(secret.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "feed":
      addScore([{ id: uuidv4(), name: "Matt", feeder: "Sam"}],'Games');
      break;

    case "say":
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);

    default:
      break;
  }

});


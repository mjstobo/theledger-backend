const Discord = require('discord.js')
const bot = new Discord.Client()
let config = require('./config.json');
const { addScore } = require('./util/addScore.js');


bot.login(config.token);


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "feed":
      addScore([
        {
          id: 1112321,
          name: "Matt",
          feeder: "Sam"
        }
      ],'Games');
      break;

    case "say":
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);

    default:
      break;
  }

});


//env setup
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

//Imports
const Discord = require('discord.js')
const secret = require('./config/secret.json');
const { addScore } = require('./Scores/addScore');

//Inits
const bot = new Discord.Client()
const { connectToDatabase } = require('./util/db/connectDb.js');

bot.login(secret.token);
connectToDatabase();
console.log("logged in & db connected");

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(secret.prefix) !== 0) return;

  const args = message.content.slice(secret.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "feed":
      let reporter = message.author.tag;
      let item = {reporter: reporter, feeder: "Matt", penalty: -20};
      let balance = await addScore(item);
      message.channel.send(`${item.feeder} has been added to the ledger. They now have lost the boys ${balance}`);
      break;

    case "say":
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);

    default:
      break;
  }

});


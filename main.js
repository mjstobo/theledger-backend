//env setup
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Imports
const { Client, MessageEmbed } = require('discord.js');
const secret = require('./config/secret.json');
const { addScore } = require('./Scores/addScore');
const { getLadder } = require('./Scores/ladder');

//Inits
const bot = new Client()
const { connectToDatabase } = require('./util/db/connectDb.js');

bot.login(secret.token);
connectToDatabase();
console.log("logged in & db connected");

bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.content.indexOf(secret.prefix) !== 0) return;

  const args = message.content.slice(secret.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "feed":
      const feedResponse = await parseScoreMessage(message, true)
      feedResponse ? message.channel.send(feedResponse) : ''
      break;

    case "mvp":
      const mvpResponse = await parseScoreMessage(message, false)
      mvpResponse ? message.channel.send(mvpResponse) : ''
      break;
    
    case "ladder":
      const ladderResponse = await getLadder();
      console.log(ladderResponse);
      let ladderMap = ladderResponse.map((e, i) => {return {name: `#${i + 1}`, value: `${e.name}: [ **${e.feedBalance}** ]`}});
      console.log(ladderMap);
      const embed = new MessageEmbed()
      .setTitle(':sparkles: The Ledger Ladder :sparkles:')
      .addFields(ladderMap)
      .setColor('#7cd992')
      .setDescription(':sparkles::sparkles::sparkles::sparkles::sparkles::sparkles::sparkles::sparkles::sparkles:')
      .setFooter(' ...stop feeding, christ');

      message.channel.send(embed);

      break;

    default:
      message.channel.send("Command not recognised, herald brain.");
      break;
  }

});

const parseScoreMessage = async (message, isFeed) => {

  let player = message.mentions.users.first();
  if(!player){
    message.channel.send("Incorrect format for your reportee. Please @ tag their discord account");
    return;
  }

  let reporter = message.author.tag;
  let item = { reporter: reporter, targetPlayer: player.tag, penalty: isFeed ? -20 : 20 };
  let balance = await addScore(item);
  let embed = new MessageEmbed()

  if(isFeed){
    embed.setTitle('A feed has occurred.')
      .addField('The Feeder: ', `${item.targetPlayer}`)
      .addField('Balance: ', `${balance}`)
      .setColor('#eb6060')
      .setDescription('An entry has been added to the ledger.')
      .setFooter('May god have mercy on their soul.');
  } else {
    embed.setTitle('A shining light amongst darkness. An MVP.')
      .addField('The MVP: ', `${item.targetPlayer}`)
      .addField('Balance: ', `${balance}`)
      .setColor('#7cd992')
      .setDescription('An entry has been added to the ledger.')
      .setFooter('Get the fuck around them.');
    }

    return embed;

}
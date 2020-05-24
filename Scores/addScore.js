const Game = require('../Schemas/games.js');
const Player = require('../Schemas/players.js')

const addScore = async (item) => {

  const newScore = new Game({
    reporter: item.reporter,
    targetPlayer: item.targetPlayer,
    penalty: item.penalty
  })

  newScore.save((err, result) => {
    if(err) return handleError(err);
  })
  let updatedBalance = await updatePlayer(item);

  return updatedBalance
}

const updatePlayer = async (item) => {
  let player = await Player.findOneAndUpdate(
    {name: item.feeder}, 
    {$inc: {feedBalance: item.penalty, count: 1}},
    {$setOnInsert: {name: item.feeder, feedBalance: item.penalty, count: 1}, upsert: true, new: true}
  );
  
  return player.feedBalance;

}


module.exports.addScore = addScore
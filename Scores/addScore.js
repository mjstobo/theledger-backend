const Game = require('../Schemas/games.js');
const Player = require('../Schemas/players.js')

const addScore = async (item) => {

  console.log(item);

  const newScore = new Game({
    reporter: item.reporter,
    feeder: item.feeder,
    penalty: item.penalty
  })

  newScore.save((err, result) => {
    if(err) return handleError(err);
  })
  let updatedBalance = await updateFeeder(item);

  return updatedBalance
}

const updateFeeder = async (item) => {
  let updatedFeeder = await Player.findOneAndUpdate(
    {name: item.feeder}, 
    {$inc: {feedBalance: item.penalty, count: 1}},
    {$setOnInsert: {name: item.feeder, feedBalance: item.penalty, count: 1}, upsert: true, new: true}
  );
  
  return updatedFeeder.feedBalance;

}


module.exports.addScore = addScore
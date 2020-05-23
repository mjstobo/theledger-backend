const Game = require('../Games/games.js');

const addScore = (item) => {

  console.log(item);

  const newScore = new Game({
    reporter: item.reporter,
    feeder: item.feeder,
    penalty: item.penalty
  })

  newScore.save((err, result) => {
    if(err) return handleError(err);
    console.log(result)
  })
      
}

module.exports.addScore = addScore
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const gamesSchema = new Schema({
        reporter: String,
        feeder: String,
        penalty: Number
});

const Game = mongoose.model('Game', gamesSchema);

module.exports = Game
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const playersSchema = new Schema({
        name: String,
        feedBalance: Number,
        count: Number
});

const Player = mongoose.model('Player', playersSchema);

module.exports = Player
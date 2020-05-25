const Player = require('../Schemas/players.js'),
      mongoose = require('mongoose');

const getLadder = () => {
    let players = getPlayers();
    return players;
}

const getPlayers = async () => {
    let playerList = Player.find({ name: { $ne: null } }, (err, players) => {}).sort({feedBalance: -1}).exec();
    return playerList;
}

module.exports.getLadder = getLadder;
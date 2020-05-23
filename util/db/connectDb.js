const mongoose = require('mongoose'),
      secret = require('../../config/secret.json'),
      mongoDB = `mongodb+srv://${secret.mongouser}:${secret.mongopw}@ledger-pkjc5.mongodb.net/theledger`,
      db = mongoose.connection;


const connectToDb = () => {
mongoose.connect(mongoDB, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
}

module.exports = {
  connectToDatabase: connectToDb
}

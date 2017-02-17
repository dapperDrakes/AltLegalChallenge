const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.connect('mongodb://altLegalChallenge:altlegal1@ds153719.mlab.com:53719/altlegalchallenge');

const tweetSchema = new Schema({
  name:{type: String},
  username:{type: String},
  picture:{type: String},
  text:{type: String}
});
const hashSchema = new Schema({
  name: String,
  tweets: [{type: Schema.Types.ObjectId, ref: 'Tweet'}]
});

const Tweet = mongoose.model('Tweet', tweetSchema);
const Hash = mongoose.model('Hash', hashSchema);

module.exports = {tweet: Tweet, hash: Hash};

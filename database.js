const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.connect('mongodb://altLegalChallenge:altlegal1@ds153719.mlab.com:53719/altlegalchallenge');

const hashSchema = new Schema({
  name: String
});
const Hash = mongoose.model('Hash', hashSchema);

module.exports = {hash: Hash};

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('./dbHelper.js');
var Twit = require('twit');
var T = new Twit({
  consumer_key:         'ERAKvb3RQEiKKovdTgr3QadOH',
  consumer_secret:      'Ah03sBHpCWD51n0t5gvO6nKv5mx06JazdheL1ArMnb7xEJ7qFK',
  access_token:         '1149004722-aXRhWGNykNLm9NGX7qN5MqD9OMONxMJVucpB63N',
  access_token_secret:  'qTxVZZZhVYGJSfXNXj4L4bTvBuMuANEnrIEDRYhLa6dLJ'
});

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/add/hash', function(req, res){
  console.log('add hash server', typeof req.body.hashtag)
  var hash = req.body.hashtag;
  dbHelper.addHash(hash, res);
  res.send(JSON.stringify("completed"));
});

app.post('/get/tweets', function(req, res){
  console.log('get/tweets endpoint hit', req.body.hashtag);
  dbHelper.getTweets(req.body.hashtag, res);
})

app.post('/add/tweets', function(req, res){
  var hash = req.body.hashtag;
  var stream = T.stream('statuses/filter', { track: '#' + req.body.hashtag, language: 'en'});
  stream.on('tweet', function (tweet) {
    // console.log(tweet);
    var requestObj = {"hash": hash, "newTweet": tweet}
    dbHelper.addTweet(requestObj, res);
  });
  res.send(JSON.stringify("completed"))
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

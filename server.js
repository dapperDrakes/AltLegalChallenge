var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('./dbHelper.js');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

app.use(express.static('public'));
app.use(bodyParser.json());

var Twit = require('twit');
var T = new Twit({
  consumer_key:         'ERAKvb3RQEiKKovdTgr3QadOH',
  consumer_secret:      'Ah03sBHpCWD51n0t5gvO6nKv5mx06JazdheL1ArMnb7xEJ7qFK',
  access_token:         '1149004722-aXRhWGNykNLm9NGX7qN5MqD9OMONxMJVucpB63N',
  access_token_secret:  'qTxVZZZhVYGJSfXNXj4L4bTvBuMuANEnrIEDRYhLa6dLJ'
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/add/hash', function(req, res){
  console.log('add hash server', req.body.hashtag)
  var hash = req.body.hashtag;
  dbHelper.addHash(hash, res);
  res.send(JSON.stringify("completed"));
});

app.post('/get/tweets', function(req, res){
  console.log('get/tweets endpoint hit', req.body.hashtag);
  dbHelper.getTweets(req.body.hashtag, res);
});

app.post('/add/tweets', function(req, res){
  var requestObj;
  var hash = req.body.hashtag;
  var stream = T.stream('statuses/filter', { track: '#' + req.body.hashtag, language: 'en'});
    stream.on('tweet', function(tweet) {
      requestObj = {"hash": hash, "newTweet": tweet}
      dbHelper.addTweet(requestObj, res);
    });
});

// var stream = T.stream('statuses/filter', { track: JSON.parse(localStorage.getItem("hashes")), language: 'en'});
// io.on('connection', function(socket){
//   stream.on('tweet', function(tweet){
//     socket.emit("info", {tweet:tweet});
//   })
// })
// console.log(stream);

// socket.io experiment failed
// io.on('connection', function(socket) {
//   stream.on('tweet', function (tweet) {
//     console.log(tweet);
//     // var requestObj = {"hash": hash, "newTweet": tweet}
//     // dbHelper.addTweet(requestObj, res);
//     socket.emit('info', {tweet: tweet});
//   });
// })
// app.listen(process.env.PORT || 3000, function(){
//   console.log('Server is running', localStorage);
// });

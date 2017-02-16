var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
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
// app.use(bodyParser.urlencoded({
    // extended: true
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//
app.post('/get/tweets', function(req, res){
  console.log('server get request',req.body);
  var hash = req.body.hashtag;

  var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })

  stream.on('tweet', function (tweet) {
    console.log(tweet);
  })
})


app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

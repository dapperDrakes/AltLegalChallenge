"use strict";
const Model = require('./database.js');
const ObjectId = require('mongoose').Types.ObjectId;
const http = require('http');
const request = require("request");

const dbFunc = {
  addHash: function(hash, res) {
    var hash = {name: hash}
    console.log('this is dbhelper hash obj', hash);
    let newHash = new Model.hash(hash);
    newHash.save(function(err){
      if(err) {
        console.log('error in saving the hash to database');
      }else{
        console.log('hash added', hash );
      }
    });
  },
  addTweet: function(req, res) {
    var tweetObj = {
      name: req.newTweet.user.name,
      username: req.newTweet.user.screen_name,
      picture: req.newTweet.user.profile_image_url,
      text: req.newTweet.text
    }
    let newTweet = new Model.tweet(tweetObj);
    newTweet.save(function(err){
      if(err) {
        console.log('error in saving Tweet to database', err);
      }
      Model.hash.update({"name": req.hash}, {$push:{"tweets": newTweet}},
        function(err){
          if(err){
            res.send(new Error("tweet not added to hash document"));
          }
          else {
            console.log('tweetObj', tweetObj);
            // res.status(200).send("tweet added to user");
          }
        }
      );
    });
  },
  getTweets: function(hash, res) {
    Model.hash.findOne({'name': hash}).populate('tweets').exec(function(err, found) {
      if(err){
        console.log('error in fetching scripts', err);
      }
      console.log('found in gettweets', found);
      res.send(found.tweets);
    });
  }
};

module.exports = dbFunc;

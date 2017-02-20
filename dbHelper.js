"use strict";
const Model = require('./database.js');
const ObjectId = require('mongoose').Types.ObjectId;
const http = require('http');
const request = require("request");

const dbFunc = {
  addHash: function(hash, res) {
    Model.hash.count({}, function(err, count){
      if(err){
        console.log(err);
      }else {
        if(count < 3){
          Model.hash.findOne({"name": hash.name}, function(err, result){
            if(err) {
              console.log("Error: ", error);
            }
            if(!result) {
              let newHash = new Model.hash(hash);
              newHash.save(function(err){
                if(err) {
                  console.log('error in saving the hash to database');
                }else{
                  console.log('hash added', hash );
                  res.status(200).send('great');
                }
              });
            }
          });
        }
      }
    });
  },
  getHashes: function(req, res) {
    Model.hash.find({}, function(err, found) {
      if(err){
        console.log('error in fetching hashes', err);
      }
      console.log('found in get hashes', found);
      res.send(found);
    });
  },
  deleteHash: function(req, res){
    Model.hash.remove({name: req.hashtag}, function(err){
      if(err){
        console.log('error in removing hashtag',err);
      }
      res.status(200).send('successfully removed');
    })
  }
};

module.exports = dbFunc;

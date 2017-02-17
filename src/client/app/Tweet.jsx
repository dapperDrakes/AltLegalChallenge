import React from 'react';
import $ from 'jquery';
const io = require('socket.io-client');

class Tweet extends React.Component {
  componentWillMount(){
    let hashtag = this.props.hashtag;
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/add/hash",
      dataType: "json",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"hashtag": hashtag}),
      success: function(data){
        console.log('successful add hash to db',data);
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/add/tweets",
          dataType: "json",
          headers: {
            "content-type": "application/json"
          },
          data: JSON.stringify({"hashtag":hashtag}),
          success: function(data){
            console.log('tweets successfully added to db',data);
          },
          error: function(error){
            console.log('this is an error from add tweets', error);
          }
        });
      },
      error: function(error){
        console.log('this is an error', error);
      }
    });
  }

  render(){
    return (
      <div>{this.props.hashtag}</div>
    )
  }
}

export default Tweet;
// socket attempt : failed
// var socket = io.connect('http://localhost');
// var self = this;
// socket.on('info', function(data){
//   console.log('socket on ',data.tweet);
//   socket.emit('my other event', {my: 'data'});
// })

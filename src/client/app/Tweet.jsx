import React from 'react';
import $ from 'jquery';
const io = require('socket.io-client');
// import {Button} from 're-bulma';

class Tweet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: []
    }
    this.getTweets = this.getTweets.bind(this);
    this.deleteHash = this.deleteHash.bind(this);
  }
  componentWillMount(){
    this.getTweets();
    let intervalId = setInterval(this.getTweets, 6000000)
  }
  getTweets(){
    var that = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/get/tweets",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"hashtag": this.props.hashtag}),
      success: function(data){
        console.log('successful return tweets', data);
        that.setState({tweets: data});
      },
      error: function(error){
        console.log('error in post tweet', error);
      }
    });
  }
  deleteHash(){
    var that = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/delete/hash",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"hashtag": this.props.hashtag}),
      success: function(data){
        console.log('successful delete hash', data);
        that.props.updateHashes();
        that.getTweets();
      },
      error: function(error){
        console.log('error in post tweet', error);
      }
    });
  }
  render(){
    return (
      <div className="TweetBox">
        <div className="titleImage">
          <h2>
            {this.props.hashtag}
          </h2>
          <div onClick={this.deleteHash}>Delete</div>
        </div>
        <div>
          {
            this.state.tweets.map((tweet, idx) => {
              return (
                <div className="tweetRender" key={idx}>
                  <div>
                    <div className="profileInfo">
                      <img className="profileImage" src={tweet.image}/>
                      <div className="screenName">
                        <div>
                          {tweet.name}
                        </div>
                        <div>
                          {tweet.screenName}
                        </div>
                      </div>
                    </div>
                    <div className="margin-top">
                      {tweet.text}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Tweet;

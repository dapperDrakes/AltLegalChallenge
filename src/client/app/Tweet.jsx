import React from 'react';
import $ from 'jquery';
const io = require('socket.io-client');
import { Icon } from 're-bulma';

// Individual hashtag tweets component
class Tweet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: []
    }
    this.getTweets = this.getTweets.bind(this);
    this.deleteHash = this.deleteHash.bind(this);
  }
  // Twitter API call to get associated tweets with hashtag
    //  Set Interval to retrieve newest tweets every 5 minutes
  componentWillMount(){
    this.getTweets();
    let intervalId = setInterval(this.getTweets, 300000)
  }
  // Twitter API call to retrieve tweets with hashtag. Hashtag is passed as prop from Home component
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
  // Delete hashtag from DB
    // Delete Hashtag calls on updateHashes prop from main component
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
          <h2 className="hashTitle">
            {this.props.hashtag}
          </h2>
          <Icon className="deleteButton" icon="fa fa-minus" onClick={this.deleteHash} />
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
                        <div className="fontBold">
                          {tweet.name}
                        </div>
                        <div className="greyText">
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

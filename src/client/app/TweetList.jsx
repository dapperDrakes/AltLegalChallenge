import React from 'react';
import Tweet from './Tweet.jsx';

// List of dynamically rendered Tweet components
class TweetList extends React.Component {
  render(){
    return (
      <div>
        <div className="hashtagContainer">
          {this.props.tweetArray.map(function(element, idx){
            return <Tweet hashtag={element} key={idx}
              tweetArray={this.props.tweetArray} updateHashes={this.props.updateHashes}
            />
          },this)}
        </div>
      </div>
    )
  }
}
export default TweetList;

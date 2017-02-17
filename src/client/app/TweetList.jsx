import React from 'react';
import Tweet from './Tweet.jsx';

class TweetList extends React.Component {
  render(){
    return (
      <div>
        <div>
          {this.props.tweetArray.map(function(element, idx){
            return <Tweet hashtag={element} key={idx}/>
          })}
        </div>
      </div>
    )
  }
}

export default TweetList;

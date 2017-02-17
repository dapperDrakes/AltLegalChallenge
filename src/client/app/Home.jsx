import React from 'react';
import Tweet from './Tweet.jsx';
import TweetList from './TweetList.jsx';
import {Input} from 're-bulma';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      watchHashes: [],
      text: ""
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.textChange = this.textChange.bind(this);
  }
  textChange(event){
    this.setState({text: event.target.value})
  }
  handleKeyPress(event) {
    var watchArray = this.state.watchHashes.slice();
    if(event.key == 'Enter'){
      console.log('enter');
      watchArray.push(event.target.value);
      this.setState({watchHashes: watchArray}, ()=>{
        console.log(this.state.watchHashes);
        this.setState({text: ""}, ()=>{
          localStorage.setItem("hashes", JSON.stringify(watchArray.map((element)=>{
            return "#" + element;
          })));
        });
      })
    }
  }
  render(){
    return (
      <div>
        <div>
          <Input type="text" placeholder="Add a hashtag" value={this.state.text}
            onChange={this.textChange}
            onKeyPress={this.handleKeyPress}/>
        </div>
        <div>
          <TweetList tweetArray={this.state.watchHashes}/>
        </div>
      </div>
    )
  }
}

export default Home;

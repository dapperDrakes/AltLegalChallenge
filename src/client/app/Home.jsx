import React from 'react';
import Tweet from './Tweet.jsx';
import TweetList from './TweetList.jsx';
import {Input} from 're-bulma';
import $ from 'jquery';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      hashes: [],
      trends: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.textChange = this.textChange.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getHashes = this.getHashes.bind(this);
    this.getTrends = this.getTrends.bind(this);
    this.updateTrends = this.updateTrends.bind(this);
  }
  textChange(input){
    this.setState({text: input});
  }
  updateState(array){
    this.setState({hashes:array});
  }
  updateTrends(array){
    this.setState({trends:array});
  }
  getTrends(){
    var that = this;
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/get/trending",
      headers: {
        "content-type": "application/json"
      },
      success: function(data){
        var array = data.map(function(element){
          return element.name;
        })
        that.updateTrends(array);
      },
      error: function(error){
        console.log('this is an error', error);
      }
    });
  }
  getHashes(){
    var that = this;
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/get/hashes",
      headers: {
        "content-type": "application/json"
      },
      success: function(data){
        console.log('successful get hash from db', data);
        var array = data.map(function(element){
          return element.name;
        })
        that.updateState(array);
      },
      error: function(error){
        console.log('this is an error', error);
      }
    });
  }
  componentWillMount(){
    this.getTrends()
    this.getHashes()
  }
  handleKeyPress(event) {
    var that = this;
    if(event[0] !== "#"){
      event = "#" + event
    }
    this.setState({text: ""}, function(){
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/add/hash",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({"name": event}),
        success: function(data){
          console.log('successful add hash to db',data);
          that.getHashes();
        },
        error: function(error){
          console.log('this is an error', error);
        }
      });
    });
  }
  render(){
    return (
      <div>
        <div>
          <AutoComplete
            dataSource={this.state.trends}
            onUpdateInput={this.textChange}
            onNewRequest={this.handleKeyPress}
            hintText="Add a hashtag"
          />
        </div>
        <div>
          <TweetList tweetArray={this.state.hashes} updateHashes={this.getHashes}/>
        </div>
      </div>
    )
  }
}

export default Home;

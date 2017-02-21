import React from 'react';
import Tweet from './Tweet.jsx';
import TweetList from './TweetList.jsx';
import {Input} from 're-bulma';
import $ from 'jquery';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//material-ui styling object
const styles = {
  underlineStyle: {
    borderColor: "#008B78",
  },
  floatingLabelStyle: {
    color: "#008B78",
  },
  floatingLabelFocusStyle: {
    color: "#008B78",
  },
};
// Main Component
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      number: 5,
      hashes: [],
      trends: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.textChange = this.textChange.bind(this);
    this.updateHash = this.updateHash.bind(this);
    this.getHashes = this.getHashes.bind(this);
    this.getTrends = this.getTrends.bind(this);
    this.updateTrends = this.updateTrends.bind(this);
  }
  // handle text change from auto-complete input field
  textChange(input){
    this.setState({text: input});
  }
  // set state for hashes in DB
  updateHash(array){
    this.setState({hashes:array});
  }
  // set state for current hashtag trends in USA
  updateTrends(array){
    this.setState({trends:array});
  }
  // Twitter API call to retrieve array of current trending hashtags in USA
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
  // get array of hashes from DB
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
        that.updateHash(array);
      },
      error: function(error){
        console.log('this is an error', error);
      }
    });
  }
  // Get trends and hashes before component is mounted
  componentWillMount(){
    this.getTrends()
    this.getHashes()
  }
  // submit of material-ui auto-complete input text
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
        <div className="autoComplete">
          <AutoComplete
            dataSource={this.state.trends}
            onUpdateInput={this.textChange}
            onNewRequest={this.handleKeyPress}
            hintText="Add a hashtag"
            underlineFocusStyle={styles.underlineStyle}
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

import React from 'react';
import {render} from 'react-dom';
import Navbar from './Navbar.jsx';
import {Input} from 're-bulma';
import $ from 'jquery';

class App extends React.Component {
  render (){
    return (
      <div>
        <Home />
        <Navbar />
      </div>
    )
  }
}

class Hash extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: ""
    }
  }
  componentWillMount(){
    var hashtag = this.props.hashtag;
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/add/hash",
      dataType: "json",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"hashtag": hashtag}),
      success: function(data){
        console.log('this is the data',data);
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/add/tweets",
          dataType: "json",
          headers: {
            "content-type": "application/json"
          },
          data: JSON.stringify({"hashtag":hashtag}),
          success: function(data){
            // console.log('this is the data',data);
            // $.ajax({
            //   type: "POST",
            //   url: "http://localhost:3000/get/tweets",
            //   dataType: "json",
            //   headers: {
            //     "content-type": "application/json"
            //   },
            //   data: JSON.stringify({"hashtag":hashtag}),
            //   success: function(data){
            //     console.log('successful get data for hashtag', data);
            //   },
            //   error: function(error){
            //     console.log('this is an error from get tweets', error )
            //   }
            // });
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
    return(
      <div>
        <div>
          {this.props.hashtag}
          LINE <br/>
          Line <br/>
        </div>
      </div>
    )
  }
}

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      watchHashes: [],
      placeholder: "Text Input",
      text: ""
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createHash = this.createHash.bind(this);
    this.createHashes = this.createHashes.bind(this);
  }
  createHash(hashElement,idx) {
    return <Hash hashtag={hashElement} key={idx}/>
  };
  createHashes(hashes){
    return hashes.map(this.createHash);
  }
  handleKeyPress(event) {
    var watchArray = this.state.watchHashes.slice();
    if(event.key == 'Enter'){
      watchArray.push(event.target.value);
      this.setState({watchHashes: watchArray}, ()=>{
        console.log(this.state.watchHashes)
      })
    }
  }
  render(){
    return (
      <div>
        <div>
          <Input type="text" placeholder={this.state.placeholder}
            onKeyPress={this.handleKeyPress}/>
        </div>
        <div>
          {this.createHashes(this.state.watchHashes)}
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

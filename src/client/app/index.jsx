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
    $.ajax({
      type: "POST",
      url: "/get/tweets",
      dataType: "json",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"hashtag":this.props.hashtag}),
      success: function(data){
        this.setState({tweets: data})
        console.log('this is the data',data);
      },
      error: function(error){
        console.log('this is an error', error);
      }
    })
  }
  render(){
    return(
      <div>
        <div>
          {this.props.hashtag}
          this is just some crap!

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

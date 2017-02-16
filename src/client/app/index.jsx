import React from 'react';
import {render} from 'react-dom';
import Twitter from 'twitter';
var client = new Twitter({
  consumer_key: "ERAKvb3RQEiKKovdTgr3QadOH",
  consumer_secret: "Ah03sBHpCWD51n0t5gvO6nKv5mx06JazdheL1ArMnb7xEJ7qFK",
  access_token_key: "1149004722-aXRhWGNykNLm9NGX7qN5MqD9OMONxMJVucpB63N",
  access_token_secret: "qTxVZZZhVYGJSfXNXj4L4bTvBuMuANEnrIEDRYhLa6dLJ"
});
client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});

class App extends React.Component {
  render (){
    return <p> Hello React!a</p>;
  }
}

render(<App/>, document.getElementById('app'));

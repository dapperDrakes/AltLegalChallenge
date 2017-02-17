import React from 'react';
import {render} from 'react-dom';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  render (){
    return (
      <div>
        <Home />
        {/* <Navbar /> */}
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

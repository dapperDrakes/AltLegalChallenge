import React from 'react';
import {render} from 'react-dom';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render (){
    return (
      <div className="body">
        {/* <Navbar /> */}
        <MuiThemeProvider>
          <Home />
        </MuiThemeProvider>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

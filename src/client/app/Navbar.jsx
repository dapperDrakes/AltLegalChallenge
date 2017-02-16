import React from 'react';
import { Nav, NavGroup, NavItem, NavToggle, Button, Icon, Image } from 're-bulma';

const style = {
  "height": "7em",
  "position": "fixed",
  "width": "100%"
};
const size = {
  "font-size": "1.2em"
};
const logo = {
  "width": "100px",
  "height": "100px",
  "margin-left": "20px",
  "margin-top": "1em"
};
const menu = {
  "margin-top": "1.6em"
};
const right = {
  "margin-right": "2em"
}

class Navbar extends React.Component {
  render(){
    return (
      <Nav style={style}>
          <NavGroup align="left">
              <Image style={logo} src="http://evolvelawnow.com/wp-content/uploads/2015/09/Alt-Legal-200x200.png"/>
          </NavGroup>
          <NavToggle style={menu} />
          <NavGroup align="right" isMenu style={right}>
            <NavItem style={size}>
              Features
            </NavItem>
            <NavItem style={size}>
              Testimonials
            </NavItem>
            <NavItem style={size}>
              About
            </NavItem>
            <NavItem>
              <Button color="isPrimary" style={size} size="isMedium">SIGN UP</Button>
            </NavItem>
          </NavGroup>
        </Nav>
    )
  }
}
export default Navbar;

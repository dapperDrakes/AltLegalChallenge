import React from 'react';
import { Nav, NavGroup, NavItem, NavToggle, Button, Icon, Image } from 're-bulma';

const style = {
  "height": "5em",
  "width": "100%",
  "margin-right": "5em"
};
const logo = {
  "margin-left": "1em",
  "margin-top": "1.2em",
  "height": "35%",
  "width": "35%"
};
const size = {
  "font-size": "1.2em"
};
const right = {
  "margin-left": "2em",
  "font-size": "1.2em"
}
const color = {
  "font-size": "1.2em",
  "background-color": "#008B78",
  "color": "#ffffff"
}

class Navbar extends React.Component {
  render(){
    return (
      <Nav style={style}>
        <NavGroup align="left">
          <Image style={logo} src="./img/Web Banner Logo 36px.png"/>
          <NavItem style={right}>
            Features
          </NavItem>
          <NavItem style={size}>
            Testimonials
          </NavItem>
          <NavItem style={size}>
            About
          </NavItem>
          <NavItem style={size}>
            Contact
          </NavItem>
        </NavGroup>
        <NavGroup align="right" isMenu>
          <NavItem style={size}>
            SIGN IN
          </NavItem>
          <NavItem>
            <Button style={color} size="isMedium">SIGN UP</Button>
          </NavItem>
        </NavGroup>
      </Nav>
    )
  }
}
export default Navbar;

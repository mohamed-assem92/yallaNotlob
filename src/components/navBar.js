import React, { Component } from 'react';
// import '../App.css';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

export default class NavbarFeatures extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          isWideEnough: false,
          dropdownOpen: false
      };
  this.onClick = this.onClick.bind(this);
  this.toggle = this.toggle.bind(this);
  }

  onClick(){
      this.setState({
          collapse: !this.state.collapse,
      });
  }

  toggle() {
      this.setState({
          dropdownOpen: !this.state.dropdownOpen
      });
  }

  render() {
      return (
          <Router>
              <Navbar color="indigo" dark expand="md" scrolling>
                  <NavbarBrand href="/">
                      <strong>YallaNotlob</strong>
                  </NavbarBrand>
                  { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                  <Collapse isOpen = { this.state.collapse } navbar>
                      <NavbarNav left>
                        <NavItem active>
                            <NavLink to="#"><i className="fa fa-home" aria-hidden="true"></i>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#"><i className="fa fa-user-circle-o" aria-hidden="true"></i>Friends</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#"><i className="fa fa-users" aria-hidden="true"></i>Groups</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#"><i className="fa fa-tasks" aria-hidden="true"></i>Orders</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>Dropdown</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">Another Action</DropdownItem>
                                <DropdownItem href="#">Something else here</DropdownItem>
                                <DropdownItem href="#">Something else here</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem> */}
                      </NavbarNav>
                      <NavbarNav right>
                      <NavItem>
                          <a className="nav-link waves-effect waves-light"><i className="fa fa-bell" aria-hidden="true"></i></a>
                        </NavItem>
                        <NavItem>
                          <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"  className="rounded-circle z-depth-0" height="40px" alt="avatar"/>
                        </NavItem>
                        <NavItem>
                          <a className="nav-link waves-effect waves-light"><i className="fa fa-edit" aria-hidden="true"></i>Mohamed Assem</a>
                        </NavItem>
                        <NavItem>
                          <a className="nav-link waves-effect waves-light"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</a>
                        </NavItem>
                      </NavbarNav>
                  </Collapse>
              </Navbar>
          </Router>
      );
  }
}


// class App extends Component {
//   render() {
//     return (
//       // <div className="App">
//       //   <header className="App-header">
//       //     <img src={logo} className="App-logo" alt="logo" />
//       //     <h1 className="App-title">Welcome to React</h1>
//       //   </header>
//       //   <p className="App-intro">
//       //     To get started, edit <code>src/App.js</code> and save to reload.
//       //   </p>
//       // </div>
//       <NavbarFeatures />
//     );
//   }
// }
// export default App;

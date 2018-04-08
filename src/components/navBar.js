import React, { Component } from 'react';
// import '../App.css';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './home';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Link } from "react-router-dom";

export default class NavbarFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      user: {},
      image: {},
      count: 0,
      showNotifications: false,
    };
  this.onClick = this.onClick.bind(this);
  this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        let currentUser = json[0]
        this.setState({ user: currentUser })
        console.log(this.state.user);
      });
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => {
        let currentPhoto = json[0]
        this.setState({ image: currentPhoto })
        console.log(this.state.image);
      });
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => { this.setState({ count: json.length }) });
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

  notificationsClicked(){
    this.setState({showNotifications: !this.state.showNotifications})
  }

  render() {
      return (
        <Router>
      <Navbar color="indigo" dark expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>YallaNotlob</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/friends"><i className="fa fa-user-circle-o" aria-hidden="true"></i>Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="groups"><i className="fa fa-users" aria-hidden="true"></i>Groups</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="orders"><i className="fa fa-tasks" aria-hidden="true"></i>Orders</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NotificationBadge count={this.state.count} effect={Effect.SCALE} />
            </NavItem>
            <NavItem>
              <a onClick={this.notificationsClicked.bind(this)} className="nav-link waves-effect waves-light"><i className="fa fa-bell" aria-hidden="true"></i></a>
            </NavItem>
            {this.state.showNotifications && < NotificationsDiv / >}
            <NavItem>
              <img src={this.state.image.url} className="rounded-circle z-depth-0" height="40px" alt="avatar" />
            </NavItem>
            <NavItem>
              <a className="nav-link waves-effect waves-light"><i className="fa fa-edit" aria-hidden="true"></i>{this.state.user.name}</a>
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

class NotificationsDiv extends React.Component{
  constructor() {
    super()
    this.state = {
      dropdownOpen: true,
    }

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
      this.setState({
          dropdownOpen: !this.state.dropdownOpen
      });
  }
  render(){
    return(
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle>Notifications</DropdownToggle>
                              <DropdownMenu>
                                  <DropdownItem href="#">Action</DropdownItem>
                                  <DropdownItem href="#">Another Action</DropdownItem>
                                  <DropdownItem href="#">Something else here</DropdownItem>
                                  <DropdownItem href="#">Something else here</DropdownItem>
                      </DropdownMenu>
      </Dropdown>
    );
  }
}

import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Link } from "react-router-dom";
import ActionCable from 'action-cable-react-jwt';
import './navBar.css';

import {reactLocalStorage} from 'reactjs-localstorage';
import ReactDOM from 'react-dom';
import Login from './login';
const uuidv4 = require('uuid/v4');


export default class NavbarFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      user: {},
      count: 0,
      showNotifications: false,
      notifications:[],
    };
  this.onClick = this.onClick.bind(this);
  this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    fetch(`http://192.168.1.9:3001/users/1`)
      .then(response => response.json())
      .then(json => {
        if(json.status){
          let currentUser = json
          this.setState({ user : currentUser })
          console.log(this.state.user);
        }

      });
    fetch(`http://192.168.1.9:3001/users/3/notifications/new`)
      .then(response => response.json())
      .then(json => { this.setState({ count: json.count , notifications:json.notifications}) });
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
  handleLogOut(){
    reactLocalStorage.clear;
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  render() {
      return (
        <nav>
      <Navbar color="indigo" dark expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>YallaNotlob</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to='/home' exact activeClassName="active"><i className="fa fa-home" aria-hidden="true"></i>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/friend"><i className="fa fa-user-circle-o" aria-hidden="true"></i>Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/groups"><i className="fa fa-users" aria-hidden="true"></i>Groups</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/orders"><i className="fa fa-tasks" aria-hidden="true"></i>Orders</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NotificationBadge count={this.state.count} effect={Effect.SCALE} />
            </NavItem>
            <NavItem>
              <a onClick={this.notificationsClicked.bind(this)} className="nav-link waves-effect waves-light"><i className="fa fa-bell" aria-hidden="true"></i></a>
            </NavItem>

            <NavItem>
              <img src="https://picsum.photos/200/300/?random" className="rounded-circle z-depth-0" height="40px" alt="avatar" />
            </NavItem>
            <NavItem>
              <a className="nav-link waves-effect waves-light"><i className="fa fa-edit" aria-hidden="true"></i>{this.state.user.name}</a>
            </NavItem>
            <NavItem>
              <button color="white" onClick={this.handleLogOut} className="nav-link waves-effect waves-light"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
      {this.state.showNotifications && < NotificationsDiv nots={this.state.notifications}/ >}
    </nav>
      );
  }
}

class NotificationsDiv extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      notifications: this.props.nots,
    }
  }
  componentWillMount(){
    console.log(this.state.notifications);
  }
  render(){

    return(
  <div className="row">
    <div className="col-md-6">
    </div>
    <div className="nots col-md-4 pull-right">
        <ul>
        {this.state.notifications.map((notification)=>{
          return(
            <li key={uuidv4()}>
            {notification.notif_type === "invite" && <Link key={uuidv4()} to={`/viewOrder/${notification.order_id}`}>{notification.name+" "+"has invited you to his order"}</Link>}
            {notification.notif_type === "join" && <Link key={uuidv4()} to={`/viewOrder/${notification.order_id}`}>{notification.name+" "+"has Joined Your Order Click Here to View"}</Link>}
            </li>
          );
        })}
        <li>
          <Link to="/notifications">View All Notifications</Link>
        </li>
        </ul>
      </div>
    </div>
    );
  }
}

import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Link } from "react-router-dom";
import { Route, Redirect } from 'react-router'

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
      userId : localStorage.getItem("user_id"),
      token : localStorage.getItem("token"),
      notifications:[],
      redirectToLogin:false,
      loggedIN:false,
    };
  this.onClick = this.onClick.bind(this);
  this.toggle = this.toggle.bind(this);
  this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount() {
     if (this.state.token) {
       this.setState({loggedIN:true});
     }
    let app = {};
    app.cable = ActionCable.createConsumer(`ws://192.168.1.3:3001/cable?token=${this.state.token}`)

    this.subscription = app.cable.subscriptions.create({channel: "NotificationsChannel"}, {
      connected: function() { console.log("cable: connected") },             // onConnect
      disconnected: function() { console.log("cable: disconnected") },       // onDisconnect
      received: (data) => {
        console.log("cable received: ", data);
        let newNotifications = this.state.notifications;
        newNotifications.push(data);
        this.setState({ count : this.state.count + 1, notifications : newNotifications })
      }
    })


    fetch(`https://hidden-dawn-97047.herokuapp.com/users/${this.state.userId}`)
      .then(response => response.json())
      .then(json => {
        if(json.status){
          let currentUser = json
          this.setState({ user : currentUser })
          console.log(this.state.user);
        }

      });

    fetch(`https://hidden-dawn-97047.herokuapp.com/users/${this.state.userId}/notifications/new`)
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
    fetch(`https://hidden-dawn-97047.herokuapp.com/users/${this.state.userId}/notifications`,{
      method:'PATCH',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(response => response.json())
    .then(json => {
      this.setState({showNotifications: !this.state.showNotifications, count : 0})

    })
  }
  handleLogOut(e){
    e.preventDefault();
    reactLocalStorage.clear();
    console.log("dddd");
    this.setState({redirectToLogin:true}); 
  }

  render() {
    const {redirectToLogin} = this.state;
    if (redirectToLogin) {
      return <Redirect to='/login'/>;
    }
      return (
        <nav>
      <Navbar color="indigo" dark expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>YallaNotlob</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
        {this.state.loggedIN &&
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
        }
        {this.state.loggedIN ? 
          <NavbarNav right>
            <NavItem>
              <NotificationBadge count={this.state.count} effect={Effect.SCALE} />
            </NavItem>
            <NavItem>
              <a onClick={this.notificationsClicked.bind(this)} className="nav-link waves-effect waves-light"><i className="fa fa-bell" aria-hidden="true"></i></a>
            </NavItem>

            <NavItem>
              <img src="http://picsum.photos/200/300/?random" className="rounded-circle z-depth-0" height="40px" alt="avatar" />
            </NavItem>
            <NavItem>
              <a className="nav-link waves-effect waves-light"><i className="fa fa-edit" aria-hidden="true"></i>{this.state.user.name}</a>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" onClick={(e)=>{this.handleLogOut(e)}} className="nav-link waves-effect waves-light"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</NavLink>
            </NavItem>
          </NavbarNav>
          :
          <NavbarNav right>
          <NavItem>
            <NavLink exact to="/register"><i className="fa fa-tasks" aria-hidden="true"></i>RegisterNow</NavLink>
            </NavItem>
            <NavItem>
            <NavLink exact to="/login"><i className="fa fa-tasks" aria-hidden="true"></i>Login</NavLink>
            </NavItem>
          </NavbarNav>
          }
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

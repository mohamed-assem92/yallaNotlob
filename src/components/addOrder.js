import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, label } from 'mdbreact';

import "./addOrder.css";


export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file:null,
      friendsArray: [],
      groupsArray:[],
      friendsResult:[],
      groupsResult:[],
      invitaionResult:[],
    };
  }
  componentWillMount(){
    fetch('http://192.168.1.9:3001/users/1/friends',{
      method:'GET',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        let friendsArr = json;
        this.setState({ friendsArray:friendsArr })
      });
    fetch(`http://192.168.1.9:3001/users/1/groups`)
        .then(response => response.json())
        .then(json => {
          let groupsArr = json;
          this.setState({ groupsArray: groupsArr })
      });
  }
  uploadImage(e){
    this.setState({file:e.target.files[0]});
  }
  handleInput(e){
    // if (e.key === "Spacebar") {
      this.setState({friendsResult:[],groupsResult:[]})
      let wantToAdd = e.target.value.split(" ");
      for (var i = 0; i < wantToAdd.length; i++) {
        for (var y = 0; y < this.state.friendsArray.length; y++) {
          if (this.state.friendsArray[y].name == wantToAdd[i]) {
            this.state.friendsResult.push(this.state.friendsArray[y]);
          }
        }
        for (var k = 0; k < this.state.groupsArray.length; k++) {
          if (this.state.groupsArray[k].name == wantToAdd[i]) {
            this.state.groupsResult.push(this.state.groupsArray[k].id);
          }
        }
      }
      if (this.state.groupsResult.length > 0) {
        console.log("here");
        let groupUsers = this.state.friendsResult;
        let myData = [];
        this.state.groupsResult.forEach((group , i)=>{
          fetch(`http://192.168.1.9:3001/users/1/groups/${this.state.groupsResult[i]}/users`)
              .then(response => response.json())
              .then(json => {
                groupUsers = groupUsers.concat(json);
                myData = groupUsers;
                groupUsers = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);
                this.setState({invitaionResult:groupUsers});
                console.log(this.state.invitaionResult);
            });
        })
      }
    // }
  }
  handleSubmit(e){
    e.preventDefault();
    var orderFor = this.refs.orderFor.value;
    var resturant = e.target.resturantName.value;
    var invited = this.state.invitaionResult;
    var body = {
      order_for: orderFor,
      friends:invited,
      restaurant:resturant,
      menu_img:"img"
    }
    fetch('http://192.168.1.9:3001/users/1/orders',{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {console.log(json)});
  }
  render() {
    return (

      <div  className='addOrder container'>
        <h1>
          Add Order
        </h1>
      <div className="row">
        <div className="col-md-6">
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div className="row">
            <label className="col-md-3" htmlFor="select"><b>Order For:</b></label>
              <select ref="orderFor" label="order for:" className="form-control col-md-8">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunche">Launch</option>
                <option value="Dinner">Dinner</option>
              </select>
          </div>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-9">
              <Input name="resturantName" label="resturantName:" icon="motorcycle" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-9">
            <Input onKeyPress={(e)=>{this.handleInput(e)}} label="Add Group or Friend:" icon="user-plus" />
            </div>
        </div>
        <div className="row">
        <br/>
          <div className="col-md-3">
          <label htmlFor="select"><b>Menu Image:</b></label>
          </div>
          <div className="col-md-9">
            <input className="btn btn-elegant waves-effect waves-light" type="file" onChange={(e)=>{this.uploadImage(e)}}/>
          </div>
        </div>
        <button type="submit" className="btn btn-indigo waves-effect waves-light pull-right">Publish</button>
        </form>
      </div>
      <div className="invitedFriends col-md-6">
      <h3>Invited Groups&Friends</h3>
      </div>
    </div>

  </div>

    );
  }
}

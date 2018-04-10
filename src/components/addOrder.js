import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, label } from 'mdbreact';
import FileBase64 from 'react-file-base64';

import "./addOrder.css";
const uuidv4 = require('uuid/v4');


export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsArray: [],
      groupsArray:[],
      friendsResult:[],
      groupsResult:[],
      invitaionResult:[],
      files:"",
      currentChoosen:[],
      showError:false,
      showSuccess:false,
      serverMessage:"",
      userId : localStorage.getItem("user_id"),
      token : localStorage.getItem("token")
    };
  }
  getFiles(files){
    this.setState({ files: files })
    console.log(files);
  }
  componentWillMount(){
    fetch(`http://localhost:3001/users/${this.state.userId}/friends`,{
      method:'GET',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        let friendsArr = json.message;
        this.setState({ friendsArray:friendsArr })
      });
    fetch(`http://localhost:3001/users/${this.state.userId}/groups`)
        .then(response => response.json())
        .then(json => {
          let groupsArr = json;
          this.setState({ groupsArray: groupsArr })
      });
  }
  handleInput(e){
    // if (e.key === "Spacebar") {
      let myData = [];
      this.setState({friendsResult:[],groupsResult:[],invitaionResult:[]})
      let wantToAdd = e.target.value.split(" ");
      for (var i = 0; i < wantToAdd.length; i++) {
        for (var y = 0; y < this.state.friendsArray.length; y++) {
          if (this.state.friendsArray[y].name == wantToAdd[i]) {
            this.state.friendsResult.push(this.state.friendsArray[y]);
            this.state.currentChoosen.push(this.state.friendsArray[y].name);
          }
        }
        for (var k = 0; k < this.state.groupsArray.length; k++) {
          if (this.state.groupsArray[k].name == wantToAdd[i]) {
            this.state.groupsResult.push(this.state.groupsArray[k].id);
            this.state.currentChoosen.push(this.state.groupsArray[k].name);
          }
        }
      }
      if (this.state.groupsResult.length > 0) {
        this.setState({invitaionResult:[]})
        let groupUsers = this.state.friendsResult;

        this.state.groupsResult.forEach((group , i)=>{
          fetch(`http://localhost:3001/users/${this.state.userId}/groups/${this.state.groupsResult[i]}/users`)
              .then(response => response.json())
              .then(json => {
                groupUsers = groupUsers.concat(json);
                myData = groupUsers;
                groupUsers = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);
                this.setState({invitaionResult:groupUsers});
                // console.log(this.state.invitaionResult);
            });
        })
      }
      else {
        this.setState({invitaionResult:[]})
        if (this.state.friendsResult.length > 0) {
          myData = this.state.friendsResult;
          var myArray = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);
          this.setState({invitaionResult:myArray});
      }
  }
  var unique = this.state.currentChoosen.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  this.setState({currentChoosen:unique});

}

  handleSubmit(e){    
    e.preventDefault();
    var orderFor = this.refs.orderFor.value;
    var resturant = e.target.resturantName.value;
    var invited = this.state.invitaionResult;
    var image = this.state.files.base64;
    var body = {
      order_for: orderFor,
      friends:invited,
      restaurant:resturant,
      menu_img:image
    }
    fetch(`http://localhost:3001/users/${this.state.userId}/orders`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          this.setState({showSuccess:true,serverMessage:json.message});
        }
        else {
          this.setState({showError:true,serverMessage:json.message});
        }
      });
  }
  removeSelected(e){
    this.setState({invitaionResult:[]})
    let ev = {target:{value:""}};
    let index = this.state.currentChoosen.indexOf(e.target.id);
    let arr = delete this.state.currentChoosen[index];
    this.setState({currentChoosen:this.state.currentChoosen});
    ev.target.value = this.state.currentChoosen.join(" ");
    this.handleInput(ev);
    let dataArray = Array.from(new Set(this.state.invitaionResult.map(JSON.stringify))).map(JSON.parse);
    console.log(dataArray);
    this.setState({invitaionResult:dataArray});
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
          <FileBase64
            multiple={ false }
            onDone={ this.getFiles.bind(this) } />
          </div>
        </div>
        <button type="submit" className="btn btn-indigo waves-effect waves-light pull-right">Publish</button>
        </form>
      </div>
      <div className="invitedFriends col-md-6">
      <h3>Invited Groups&Friends</h3>
      <div className="row">
        {this.state.currentChoosen.map((choose) => {
          return(
              <div key={uuidv4()} className="col-md-6">
              <h4 key={uuidv4()} className="center" >{choose}</h4>
              <button id={choose} onClick={(e)=>{this.removeSelected(e)}} key={uuidv4()} className="btn btn-indigo waves-effect waves-light pull-right">Remove</button>
            </div>
          );
        })}
        </div>

      </div>
      {this.state.showError && <div className="alert alert-danger">{this.state.serverMessage}</div>}
      {this.state.showSuccess && <div className="alert alert-success">{this.state.serverMessage}</div>}
    </div>

  </div>

    );
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./friend.css";
const uuidv4 = require('uuid/v4');

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsArray: [],
      inputValue: '',
      showError: false,
      errorMessage:'',

    };
  }
  componentWillMount(){
    fetch('http://localhost:3001/users/1/friends',{
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
  }
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  addFriend(){
    if (this.state.inputValue) {
      fetch('http://localhost:3001/users/1/friends', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.inputValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
        .then(json => {
          if (json.status) {
            let newFriend = this.state.friendsArray;
            newFriend.push(json.message);
            this.setState({friendsArray:newFriend});
          }
          else {
            this.setState({showError:true , errorMessage:json.message})
          }
        })
    }
    else {
      console.log("input Empty");
    }
  }
  removeFriend(e , fid){
    console.log(fid);
    e.preventDefault;
    fetch(`http://localhost:3001/users/1/friends/${fid}`, {
      method:'DELETE',
    })
    .then(res => res.json())
    .then(data => {this.setState({friendsArray:data.message})})
  }
  render() {
    return (

      <div  className='container friends'>
      <h1>
      Friends
      </h1>
      <span className="row inputs">
        <input require="true" type="email" onChange={this.updateInputValue.bind(this)} className="addfriend form-control col-md-6" /><input type="button" onClick={this.addFriend.bind(this)} className="addfriend btn btn-primary pull-right" value="Add"/>
      </span>
      {this.state.showError && <div className="alert alert-danger">{this.state.errorMessage}</div>}
      <div className="row">
      {this.state.friendsArray.map((friend)=>{
        return(
          <div key={uuidv4()} className="col-md-3">
          <figure className="row" key={uuidv4()}>
            <img key={uuidv4()} src="https://picsum.photos/200/300/?random"  className="img-responsive img-circle"/>
            <figcaption key={uuidv4()}>
            <p key={uuidv4()}>{friend.name}</p>
            <button onClick={(e)=>{this.removeFriend(e , friend.id)}} key={uuidv4()} className="btn btn-elegant waves-effect waves-light">Remove</button>
            </figcaption>
            </figure>
          </div>
        );
      })}
      </div>
    </div>

    );
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import ActionCable from 'action-cable-react-jwt';
const uuidv4 = require('uuid/v4');


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      friendsArr :[],
      ordersArr : [],
      userId : localStorage.getItem("user_id"),
      token : localStorage.getItem("token")
    }

  }
componentWillMount(){

  let app = {};
  app.cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${this.state.token}`)
  this.subscription = app.cable.subscriptions.create({channel: "ActivitiesChannel"}, {
  connected: function() { console.log("cable: connected") },             // onConnect
  disconnected: function() { console.log("cable: disconnected") },       // onDisconnect
  received: (data) => { 
    console.log("cable received: ", data); 
    let newArr = this.state.friendsArr;
    newArr.push(data);
    this.setState({ friendsArr:newArr })
  }         
})
  fetch(`http://localhost:3001/users/${this.state.userId}/friends-activity`)
    .then(response => response.json())
    .then(json => {
      let friendsArr = []
          for (let i = 0; i < json.length; i++) {           
            for (let j = 0; j < json[i].friend_orders.length; j++) {
             json[i].friend_orders[j].name = json[i].friend_name;
             friendsArr.push(json[i].friend_orders[j]); 
            }          
         }
        this.setState({ friendsArr:friendsArr })
      
    });
    fetch(`http://localhost:3001/users/${this.state.userId}/orders`)
      .then(response => response.json())
      .then(json => {       
         this.setState({ ordersArr:json })       
      });

}
  render() {
    const names=[1,2,3];


    return (

<div className="row">

      <div className="col">
          <h3>Latest Orders</h3>
          <ul className="list-group list-group-flush" >
          {this.state.ordersArr.map(function(order, index){
                   return <li key={uuidv4()} className="list-group-item">{order.order_for + " from "+ order.restaurant +" on " + order.created_at }<button className="btn btn-indigo">Details</button></li>;
                 })}
          </ul>
      </div>

      <div className="col">
      </div>

     <div className="col">

       <section className="pt-5 pb-3">
           <div className="row">

           {this.state.friendsArr.map(function(friend, index){
                    return  <div className="col-lg-6" key={uuidv4()}>
                       <div className="mdb-feed">
                          <div className="news">

                             <div className="label">
                               <img src="http://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" className="rounded-circle z-depth-1-half"/>
                              </div>

                            <div className="excerpt">
                              <div className="brief">
                                  <a className="name" textDecoration="underline" >{friend.name + " created an order for " + friend.order_for + " from " + friend.restaurant}</a>
                                 
                              </div>
                           </div>

                         </div>
                      </div>
                     </div>
                  })}

            </div>
            </section>

            </div>
</div>
    );
  }
}

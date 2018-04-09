import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
const uuidv4 = require('uuid/v4');


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      friendsArr :[],
      ordersArr : []
    }

  }
componentWillMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      let friendsArr = json
      this.setState({ friendsArr:friendsArr })
      // console.log(reactLocalStorage.get("userToken"));

      // console.log(currentName);
    });
    fetch(`http://localhost:3001/users/1/orders`)
      .then(response => response.json())
      .then(json => {
        console.log(json);

        let ordersArr = json
        this.setState({ ordersArr:ordersArr })
        console.log(ordersArr);
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
                               <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" className="rounded-circle z-depth-1-half"/>
                              </div>

                            <div className="excerpt">
                              <div className="brief">
                                  <a className="name" textDecoration="underline" >{friend.name}</a>
                                  <p className="name">created an order from {friend.email}</p>
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

import React, { Component } from 'react';
import { Link } from "react-router-dom";


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
      // console.log(currentName);
    });
    fetch('https://jsonplaceholder.typicode.com/users')
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

<div class="row">

      <div class="col">
          <h3>Latest Orders</h3>
          <ul class="list-group list-group-flush">
          {this.state.ordersArr.map(function(order, index){
                   return <li key={ index } className="list-group-item">{order.name}</li>;
                 })}
          </ul>
      </div>

      <div class="col">
      </div>

     <div class="col">

       <section class="pt-5 pb-3">
           <div class="row">

           {this.state.friendsArr.map(function(friend, index){
                    return  <div className="col-lg-6">
                       <div className="mdb-feed">
                          <div className="news">

                             <div className="label">
                               <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" className="rounded-circle z-depth-1-half"/>
                              </div>

                            <div className="excerpt">
                              <div className="brief">
                                  <a className="name" text-decoration="underline" >{friend.name}</a>
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

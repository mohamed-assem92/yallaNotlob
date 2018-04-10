import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./orders.css";

const uuidv4 = require('uuid/v4');

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersArray: [],
      waitingOrder:false,
      userId : localStorage.getItem("user_id"),
      token : localStorage.getItem("token")
    };
  }
  componentWillMount(){
    fetch(`http://10.145.9.58:3001/users/${this.state.userId}/orders`,{
      method:'GET',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ ordersArray: json})
      });
  }
  finishOrder(e , orderID){
    e.preventDefault();
    fetch(`http://10.145.9.58:3001/users/${this.state.userId}/orders/${orderID}`,{
      method:'PATCH',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          fetch(`http://10.145.9.58:3001/users/${this.state.userId}/orders`,{
            method:'GET',
            headers:{
              "Content-type": "application/json; charset=UTF-8",
            }
          })
            .then(response => response.json())
            .then(json => {
              this.setState({ ordersArray: json})
            });
        }
      });
  }
  cancelOrder(e , orderID){
    e.preventDefault();
    fetch(`http://10.145.9.58:3001/users/${this.state.userId}/orders/${orderID}`, {
      method:'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        fetch(`http://10.145.9.58:3001/users/${this.state.userId}/orders`,{
          method:'GET',
          headers:{
            "Content-type": "application/json; charset=UTF-8",
          }
        })
          .then(response => response.json())
          .then(json => {
            this.setState({ ordersArray: json})
          });
      }
    })
  }
  render() {
    return (

      <div  className='container orders'>
      <h1>
      Orders
      </h1>
      <h3><Link to='/addOrder' className="active pull-right"><i className="fa fa-edit" aria-hidden="true"></i>AddOrder</Link></h3>
      <table className="table">
      <thead className="mdb-color darken-3">
      <tr className="text-white">
            <th>Order</th>
            <th>Resturnts</th>
            <th>Invited</th>
            <th>Joined</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody className="tableBody">
    {this.state.ordersArray.map((order)=>{
      return(
        <tr  key={uuidv4()}>
            <th  key={uuidv4()} scope="row">{order.order_for}</th>
            <td  key={uuidv4()}>{order.restaurant}</td>
            <td  key={uuidv4()}>{order.invited}</td>
            <td  key={uuidv4()}>{order.joined}</td>
            <td  key={uuidv4()}>{order.state}</td>
            {order.state === "waiting" && <td  key={uuidv4()}>
              <Link key={uuidv4()} to={`/viewOrder/${order.id}`} className="active">View</Link><br />
              <Link onClick={(e)=>{this.finishOrder(e , order.id)}} key={uuidv4()} to='/finishOrder' className="active">Finish</Link><br />
              <Link onClick={(e)=>{this.cancelOrder(e , order.id)}} key={uuidv4()} to='/cancelOrder' className="active">Cancel</Link>
            </td>}
            {order.state === "finished" && <td  key={uuidv4()}>
                <Link key={uuidv4()} to={`/viewOrder/${order.id}`} className="active">View</Link><br />
            </td>}
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>

    );
  }
}

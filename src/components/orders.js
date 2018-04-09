import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./orders.css";

const uuidv4 = require('uuid/v4');

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersArray: [],
    };
  }
  componentWillMount(){
    fetch('http://localhost:3001/users/1/orders',{
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

        </tr>
      );
    })}
    </tbody>
    </table>
    </div>

    );
  }
}

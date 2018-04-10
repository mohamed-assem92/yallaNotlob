import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, label } from 'mdbreact';

const uuidv4 = require('uuid/v4');


export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId : this.props.location.pathname.split("/")[2],
      currentDetails:[],
      userId : localStorage.getItem("user_id"),
      token : localStorage.getItem("token"),
    };
  }
  componentWillMount(){
    fetch(`http://localhost:3001/orders/${this.state.orderId}`,{
      method:'GET',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        let details = json.message;
        this.setState({ currentDetails:details })
      });
  }
  handleSubmit(e){
    e.preventDefault();
    let item = e.target.item.value;
    let amount = e.target.amount.value;
    let price = e.target.price.value;
    let comment = e.target.comment.value;
    let order_id = this.state.orderId;
    let body = {
      order_id : order_id,
      item : item,
      price : price,
      comment : comment,
      amount : amount
    }
    fetch(`http://localhost:3001/users/${this.state.userId}/order_details`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        
        if (json.status) {
          let latestDetails = this.state.currentDetails;
          latestDetails.push(json.message);
          this.setState({currentDetails:latestDetails});
        }
      });
  }
  render() {
    return (

      <div  className='container orderDetails'>
      <h1>
      Order Details
      </h1>
      <div className="row justify-content-center">
      <div className="col-md-6">
      <table className="table">
      <thead className="mdb-color darken-3">
      <tr className="text-white">
            <th>Person</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Comment</th>
        </tr>
    </thead>
    <tbody className="tableBody">
      {this.state.currentDetails.map((detail)=>{
        return(
          <tr  key={uuidv4()}>
            <th  key={uuidv4()} scope="row">{detail.user_id}</th>
            <td  key={uuidv4()}>{detail.item}</td>
            <td  key={uuidv4()}>{detail.amount}</td>
            <td  key={uuidv4()}>{detail.price}</td>
            <td  key={uuidv4()}>{detail.comment}</td>
        </tr>
        );
      })}
    </tbody>
    </table>
    </div>
      <div className="col-md-5">
        10 friends invited
      </div>
    </div>
    <form onSubmit={(e) => {this.handleSubmit(e)}}>
    <div className="row">
    <div className="col-md-3">
    <Input name="item" label="Item" icon="bars" />
    </div>
    <div className="col-md-2">
    <Input name="amount" type="number" label="amount" icon="calculator" />
    </div>
    <div className="col-md-2">
    <Input name="price" type="number" label="price" icon="money" />
    </div>
    <div className="col-md-3">
    <Input name="comment" label="comment" icon="pencil-square" />
    </div>
    <div className="col-md-1">
    <button type="submit" className="btn btn-elegant waves-effect waves-light">Add</button>
    </div>
    </div>
    </form>
    </div>

    );
  }
}

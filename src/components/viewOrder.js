import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, label } from 'mdbreact';
import ActionCable from 'action-cable-react-jwt';
const uuidv4 = require('uuid/v4');


export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.location.pathname.split("/")[2],
      currentDetails: [],
      userId: localStorage.getItem("user_id"),
      token: localStorage.getItem("token"),
    };
  }
  componentWillMount() {


    let app = {};
    app.cable = ActionCable.createConsumer(`ws://10.145.9.58:3001/cable?token=${this.state.token}`)

    this.subscription = app.cable.subscriptions.create({ channel: "OrdersChannel" }, {
      connected: function () { console.log("cable: connected") },             // onConnect
      disconnected: function () { console.log("cable: disconnected") },       // onDisconnect
      received: (data) => {
        console.log("cable received: ", data);
        if (data.action == "add") {
          let latestDetails = this.state.currentDetails;
          let order = data.order;
          order.name = data.name;
          latestDetails.push(order)
          this.setState({ currentDetails: latestDetails })
        }else{
          let latestDetails = []
          this.state.currentDetails.forEach(order => {
            if(order.id != data.order.id){
              latestDetails.push(order);
            }
          })
          this.setState({ currentDetails: latestDetails })
        }
      }

    })


    fetch(`http://10.145.9.58:3001/orders/${this.state.orderId}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);

        if (json.status) {
          let orders = json.message.orders;
          let names = json.message.names;
          for (let i = 0; i < orders.length; i++) {
            orders[i].name = names[i]
          }
          let details = orders;
          this.setState({ currentDetails: details });
        }


      });
  }
  removeDetail(e){
    let detailID = e.target.id;
    fetch(`http://localhost:3001/users/${this.state.userId}/order_details/${detailID}`, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(responce => responce.json())
    .then(json => {
      let latestDetails = []
      this.state.currentDetails.forEach(order => {
        if(order.id != detailID){
          latestDetails.push(order);
        }
      })
      this.setState({ currentDetails: latestDetails })
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    let item = e.target.item.value;
    let amount = e.target.amount.value;
    let price = e.target.price.value;
    let comment = e.target.comment.value;
    let order_id = this.state.orderId;
    let body = {
      order_id: order_id,
      item: item,
      price: price,
      comment: comment,
      amount: amount
    }
    fetch(`http://10.145.9.58:3001/users/${this.state.userId}/order_details`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);

        if (json.status) {
          let latestDetails = this.state.currentDetails;
          let order = json.message.order;
          order.name = json.message.name;
          latestDetails.push(order);
          this.setState({ currentDetails: latestDetails });
        }
      });
  }
  render() {
    return (

      <div className='container orderDetails'>
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
                {this.state.currentDetails.map((detail) => {
                  return (
                    <tr key={uuidv4()}>
                      <th key={uuidv4()} scope="row">{detail.name}</th>
                      <td key={uuidv4()}>{detail.item}</td>
                      <td key={uuidv4()}>{detail.amount}</td>
                      <td key={uuidv4()}>{detail.price}</td>
                      <td key={uuidv4()}>{detail.comment}
                        {detail.user_id == this.state.userId && <button id={detail.id} onClick={(e)=>{this.removeDetail(e)}}>delete</button>}
                      </td>                      
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
        <form onSubmit={(e) => { this.handleSubmit(e) }}>
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

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, label , InputFile } from 'mdbreact';
import "./addOrder.css";


export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file:null,

    };
  }
  uploadImage(e){
    this.setState({file:e.target.files[0]});
  }
  render() {
    return (

      <div  className='addOrder container'>
        <h1>
          Add Order
        </h1>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <label className="col-md-3" htmlFor="select"><b>Order For:</b></label>
              <select label="order for:" className="form-control col-md-9">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunche">Launch</option>
                <option value="Dinner">Dinner</option>
              </select>
          </div>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-9">
              <Input label="resturantName:" icon="motorcycle" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-9">
            <Input label="Add Group or Friend:" icon="user-plus" />
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
        <button type="button" className="btn btn-indigo waves-effect waves-light pull-right">Publish</button>
      </div>
      <div className="invitedFriends col-md-6">
      <h3>Invited Groups&Friends</h3>
      </div>
    </div>

  </div>

    );
  }
}

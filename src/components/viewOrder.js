import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId : this.props.location.pathname.split("/")[2],
    };
  }
  componentWillMount(){
    console.log(this.state.orderId);
  }
  render() {
    return (

      <div  className='login-form'>
      <p>
      viewOrder
      </p>
    </div>

    );
  }
}

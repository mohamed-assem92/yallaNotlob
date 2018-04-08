import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';


export default class ForgetPsw extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
    }
 console.log(this.state.user)
  }
  handleChangeEmail = event => {
      this.setState({ email: event.target.value });
    }
  render(){
    return(

      <div class="row">

      <div class="col">
          </div>

      <div class="col">
      <div class="md-form">
    <i class="fa fa-envelope prefix"></i>
    <input type="email" id="inputValidationEx" class="form-control validate" name="email" onChange={this.handleChangeEmail}/>
    <label for="inputValidationEx" data-error="wrong" data-success="right">Enter your email</label>
</div>
  </div>

  <div class="col">
      </div>
      </div>
  
    )
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';


export default class ResetPsw extends Component{
  constructor(props){
    super(props);
    this.state={
      newPsw:'',
      conPsw:'',

    }
 console.log(this.state.user)
  }
  handleChangePsw = event => {
      this.setState({ psw: event.target.value });
    }
    handleChangeConPsw= event => {
        this.setState({ psw: event.target.value });
      }
  render(){
    return(

      <div class="row">

      <div class="col">
          </div>

      <div class="col">
      <div class="md-form">
      <i class="fa fa-lock prefix"></i>
      <input name="psw" onChange={this.handleChangePsw} type="password" id="inputValidationEx2" class="form-control validate" />
      <label for="inputValidationEx2" data-error="wrong" data-success="right">Type your New password</label>
  </div>

  <div class="md-form">
    <i class="fa fa-lock prefix"></i>
    <input name="conPsw" onChange={this.handleChangeConPsw} type="password" id="inputValidationEx2" class="form-control validate" />
    <label for="inputValidationEx2" data-error="wrong" data-success="right">Confirm your New password</label>
</div>
  </div>

  <div class="col">
      </div>
      </div>

    )
  }
}

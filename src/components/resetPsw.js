import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import ReactDOM from 'react-dom';
import Login from './login';


export default class ResetPsw extends Component{
  constructor(props){
    super(props);
    this.state={
      newPsw:'',

    }
 console.log(this.state.user)
  }
  handleChangePsw = event => {
      this.setState({ newPsw: event.target.value });
    }
    handleChangeConPsw= event => {
        this.setState({ conPsw: event.target.value });
      }
      handleSubmit = event => {
        event.preventDefault();
        if(this.state.newPsw == this.state.conPsw )
          {
              const user = {
                password: this.state.newPsw,
              };
              // console.log({user})
            fetch('https://hidden-dawn-97047.herokuapp.com/password/reset', {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            console.log(response);
            if(response.status){
            }
          });

      }
    }

  render(){
    return(

      <div class="row">

      <div class="col">
          </div>

      <div class="col">
      <form onSubmit={this.handleSubmit}>

      <div class="md-form">
      <i class="fa fa-lock prefix"></i>
      <input name="newPsw" onChange={this.handleChangePsw} type="password" id="inputValidationEx2" class="form-control validate" />
      <label for="inputValidationEx2" data-error="wrong" data-success="right">Type your New password</label>
  </div>

  <div class="md-form">
    <i class="fa fa-lock prefix"></i>
    <input name="conPsw" onChange={this.handleChangeConPsw} type="password" id="inputValidationEx2" class="form-control validate" />
    <label for="inputValidationEx2" data-error="wrong" data-success="right">Confirm your New password</label>
</div>
<div class="text-center mt-4">
    <button class="btn btn-indigo" type="submit">Done</button>
</div>
</form>
  </div>

  <div class="col">
      </div>
      </div>

    )
  }
}

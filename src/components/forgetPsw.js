import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import ReactDOM from 'react-dom';
import Login from './login';


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
    handleSubmit = event => {
            event.preventDefault();

            const user = {
              email: this.state.email,

            };
            // console.log({user})
<<<<<<< HEAD
            fetch('https://hidden-dawn-97047.herokuapp.com/password/forget', {
=======
            fetch('http://192.168.1.3:3001/password/forget', {
>>>>>>> 61a469a9ee5ae78c30ba6d96a5f1e403c788b0e0
          method: 'POST',
          body: JSON.stringify(user),
          headers:{
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if(response.status){
            //redirect to login
          }
        });

    }

  render(){
    return(

      <div class="row">

      <div class="col">
          </div>

      <div class="col">
      <form onSubmit={this.handleSubmit}>
      <div class="md-form">
      <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
      <input name="email" onChange={this.handleChangeEmail} type="email" id="defaultFormLoginEmailEx" class="form-control"/>

</div>
<div class="text-center mt-4">
    <button class="btn btn-indigo" type="submit">Send Email</button>
</div>
</form>
  </div>

  <div class="col">
      </div>
      </div>

    )
  }
}

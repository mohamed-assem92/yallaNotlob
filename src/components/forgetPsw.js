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
            fetch('http://localhost:3001/password/forget', {
          method: 'POST',
          body: JSON.stringify(user),
          headers:{
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if(response.status){
            ReactDOM.render(<Login />, document.getElementById('root'));
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
    <i class="fa fa-envelope prefix"></i>
    <input type="email" id="inputValidationEx" class="form-control validate" name="email" onChange={this.handleChangeEmail}/>
    <label for="inputValidationEx" data-error="wrong" data-success="right">Enter your email</label>
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

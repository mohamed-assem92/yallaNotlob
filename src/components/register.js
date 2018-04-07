import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      psw:'',
      conPsw:''
    }
  }
  handleChangeName = event => {
      this.setState({ name: event.target.value });
    }
  handleChangeEmail = event => {
      this.setState({ email: event.target.value });
    }
  handleChangePsw = event =>{
   this.setState({ psw: event.target.value})
  }
  handleChangeConfPsw = event =>{
   this.setState({ conPsw: event.target.value})
  }

  handleSubmit = event => {
        event.preventDefault();

        const user = {
          name: this.state.name,
          email: this.state.email,
          psw: this.state.psw,
          conPswpsw: this.state.conPsw
        };
        console.log({user})
        fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({user})
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

  }

  render() {
    return (

<div class="row">

 <div class="col">
    </div>

<div class="col">

<div class="card">

    <div class="card-body">

        <form onSubmit={this.handleSubmit}>
            <p class="h4 text-center py-4">Sign up</p>

            <div class="md-form">
                <i class="fa fa-user prefix grey-text"></i>
                <input type="text" id="materialFormCardNameEx" class="form-control" name="name" onChange={this.handleChangeName}/>
                <label for="materialFormCardNameEx" class="font-weight-light">Your name</label>
            </div>

            <div class="md-form">
                <i class="fa fa-envelope prefix grey-text"></i>
                <input type="email" id="materialFormCardEmailEx" class="form-control" name="email" onChange={this.handleChangeEmail} />
                <label for="materialFormCardEmailEx" class="font-weight-light">Your email</label>
            </div>


            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input type="password" id="materialFormCardPasswordEx" class="form-control" name="psw" onChange={this.handleChangePsw} />
                <label for="materialFormCardPasswordEx" class="font-weight-light">Your password</label>
            </div>

            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input type="password" id="materialFormCardPasswordEx" class="form-control" name="conPsw" onChange={this.handleChangeConfPsw}/>
                <label for="materialFormCardPasswordEx" class="font-weight-light">Confirm Your password</label>
            </div>

            <div class="text-center py-4 mt-3">
                <button class="btn btn-blue" type="submit">Register</button>
            </div>
        </form>

    </div>

</div>


<div class="col">
    </div>

    </div>
</div>

    );
  }
}

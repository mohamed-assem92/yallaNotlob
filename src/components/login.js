import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import SocialButton from './socialButton';
import GoogleLogin from 'react-google-login';

const handleSocialLogin = (FbUser) => {
  console.log(FbUser)
  fetch('https://jsonplaceholder.typicode.com/users', {
method: 'POST',
body: JSON.stringify(FbUser)
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const responseGoogle = (GoUser) => {
  var temp =JSON.stringify(GoUser)

  console.log(temp)
  fetch('https://jsonplaceholder.typicode.com/users', {
method: 'POST',
body: JSON.stringify(GoUser)
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
}

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      psw:'',
    }
 console.log(this.state.user)
  }

  handleChangeEmail = event => {
      this.setState({ email: event.target.value });
    }
 handleChangePsw = event =>{
   this.setState({ psw: event.target.value})
 }

handleSubmit = event => {
        event.preventDefault();

        const user = {
          email: this.state.email,
          psw: this.state.psw
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
    <form onSubmit={this.handleSubmit} >
<section class="form-elegant">

    <div class="card">

        <div class="card-body mx-4">

            <div class="text-center">
                <h3 class="dark-grey-text mb-5"><strong>Sign in</strong></h3>
            </div>

            <div class="md-form">
                <input type="text" id="Form-email1" class="form-control" name="email" onChange={this.handleChangeEmail}/>
                <label for="Form-email1">Your email</label>
            </div>

            <div class="md-form pb-3">
                <input type="password" id="Form-pass1" class="form-control" name="psw" onChange={this.handleChangePsw}/>
                <label for="Form-pass1">Your password</label>
                <p class="font-small blue-text d-flex justify-content-end">Forgot <a href="/password/forget" class="blue-text ml-1"> Password?</a></p>
            </div>

            <div class="text-center mb-3">
                <button type="submit" class="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign in</button>
            </div>
            <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>

                <div class="row my-3 d-flex justify-content-center">
                <div>

    <GoogleLogin  class="btn btn-white btn-rounded z-depth-1a"
    clientId="256661036793-0oob0hi0k034t80e6gm3u69i84ljnvhg.apps.googleusercontent.com"
    // buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  >
  <i class="fa fa-google-plus blue-text" />
  </GoogleLogin>
  </div>
  <SocialButton class="btn btn-white btn-rounded mr-md-10 z-depth-1a"
    provider='facebook'
    appId='183353488972514'
    onLoginSuccess={handleSocialLogin}
    onLoginFailure={handleSocialLoginFailure}
  >
    <i class="fa fa-facebook blue-text text-center"></i>
  </SocialButton>

                </div>

        </div>

        <div class="modal-footer mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" class="blue-text ml-1"> Sign Up</a></p>
        </div>

    </div>

</section>
</form>
</div>

<div class="col">
    </div>

</div>

    );
  }
}

import React, { Component } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import SocialButton from './socialButton';
import GoogleLogin from 'react-google-login';
import {reactLocalStorage} from 'reactjs-localstorage';
// import ReactDOM from 'react-dom';
import Home from './home';
import "./login.css";

// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
// import { Route } from 'react-router'

const handleSocialLogin = (FbUser) => {
  console.log("Hello");
  console.log(FbUser);
  fetch('https://hidden-dawn-97047.herokuapp.com/users/login/facebook', {
    method: 'POST',
    body: JSON.stringify( FbUser),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    }  
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.status) {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        // redirect here to home
        this.setState({redirect:true});
        
      }
    });
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}
const responseGoogleFailure = () => {};
const responseGoogle = (GoUser) => {
  fetch('https://hidden-dawn-97047.herokuapp.com/users/login/google', {
    method: 'POST',
    body: JSON.stringify(GoUser),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.status) {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        // redirect here to home
        this.setState({redirect:true});

      } 
    });
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      psw:'',
      redirect:false,
    }
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
          password: this.state.psw
        };
        // console.log({user})
        fetch('https://hidden-dawn-97047.herokuapp.com/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(res => res.json())
    .then(response => {
      if(response.status){
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        this.setState({redirect:true});
      }
    });

  }
  render() {

    const {redirect} = this.state;
    if (redirect) {
      return <Redirect to='/home'/>;
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <p className="h4 text-center mb-4">Sign in</p>


            <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
            <input name="email" onChange={this.handleChangeEmail} type="email" id="defaultFormLoginEmailEx" class="form-control" />

            <br />


            <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
            <input name="psw" onChange={this.handleChangePsw} type="password" id="defaultFormLoginPasswordEx" class="form-control" />
            <p className="font-small blue-text d-flex justify-content-end">Forgot <a href="/password/forget" class="blue-text ml-1"> Password?</a></p>

            <div className="text-center mt-4">
              <button className="btn btn-indigo" type="submit">Login</button>
            </div>
          </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <label for="defaultFormLoginPasswordEx" className="blue-text">Social Login</label>
        </div>
        <div className="row justify-content-center">
          <GoogleLogin  className="btn btn-gplus"
            clientId="256661036793-0oob0hi0k034t80e6gm3u69i84ljnvhg.apps.googleusercontent.com"
            // buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFailure}
          >
            <i class="fa fa-google-plus pr-1"></i>Login With Google+
          </GoogleLogin>
          <SocialButton className="btn btn-fb"
            provider='facebook'
            appId='183353488972514'
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            <i className="fa fa-facebook pr-1"></i>Login With FaceBook
          </SocialButton>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import SocialButton from './socialButton';
import GoogleLogin from 'react-google-login';
import { reactLocalStorage } from 'reactjs-localstorage';
import ReactDOM from 'react-dom';
import Home from './home';
import { Route, Redirect } from 'react-router'
// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);

const handleSocialLogin = (FbUser) => {
  console.log("Hello");
  console.log(FbUser);
  fetch('http://localhost:3001/users/login/facebook', {
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
      }
    });
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const responseGoogle = (GoUser) => {
  fetch('http://localhost:3001/users/login/google', {
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
      } 
    });
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      psw: '',
    }
    console.log(this.state.user)
  }

  handleChangeEmail = event => {
<<<<<<< HEAD
    this.setState({ email: event.target.value });
  }
  handleChangePsw = event => {
    this.setState({ psw: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.psw
    };
    console.log({ user })
    fetch('http://localhost:3001/users/login', {
=======
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
        fetch('http://localhost:3001/users/login', {
>>>>>>> 42af71d5b939f98d25d1e349ac204140c65f71c3
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.status) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user_id);

          ReactDOM.render(<Home />, document.getElementById('root'));
        }
      });

  }
  render() {
    return (

      <div className="row">

        <div className="col">
        </div>

        <div className="col">




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

            <div>
              <label for="defaultFormLoginPasswordEx" className="blue-text">Or Sign In With:</label>
              <br />
              <GoogleLogin className="btn btn-white btn-rounded z-depth-1a"
                clientId="256661036793-0oob0hi0k034t80e6gm3u69i84ljnvhg.apps.googleusercontent.com"
                // buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              >
                <i className="fa fa-google-plus blue-text" />
              </GoogleLogin>
              <SocialButton className="btn btn-fb"
                provider='facebook'
                appId='183353488972514'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
              >
                <i className="fa fa-facebook"></i>
              </SocialButton>
            </div>
          </form>


        </div>

        <div className="col">
        </div>

      </div>

    );
  }
}

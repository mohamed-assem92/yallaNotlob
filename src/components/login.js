import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, label } from 'mdbreact';
import SocialButton from './socialButton';
import GoogleLogin from 'react-google-login';
import {reactLocalStorage} from 'reactjs-localstorage';
import ReactDOM from 'react-dom';
import Home from './home';
// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
import { Route, Redirect } from 'react-router'

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
          password: this.state.psw
        };
        // console.log({user})
        fetch('http://192.168.1.9:3001/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response.status){
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);

        ReactDOM.render(<Home />, document.getElementById('root'));
      }
    });

}
  render() {
    return (

<div class="row">

<div class="col">
    </div>

    <div class="col">




    <form onSubmit={this.handleSubmit}>
        <p class="h4 text-center mb-4">Sign in</p>


        <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
        <input name="email" onChange={this.handleChangeEmail} type="email" id="defaultFormLoginEmailEx" class="form-control"/>

        <br/>


        <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
        <input name="psw" onChange={this.handleChangePsw} type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
        <p class="font-small blue-text d-flex justify-content-end">Forgot <a href="/password/forget" class="blue-text ml-1"> Password?</a></p>

        <div class="text-center mt-4">
            <button class="btn btn-indigo" type="submit">Login</button>
        </div>

        <div>
        <label for="defaultFormLoginPasswordEx" class="blue-text">Or Sign In With:</label>
<br/>
<GoogleLogin  class="btn btn-white btn-rounded z-depth-1a"
clientId="256661036793-0oob0hi0k034t80e6gm3u69i84ljnvhg.apps.googleusercontent.com"
// buttonText="Login"
onSuccess={responseGoogle}
onFailure={responseGoogle}
>
<i class="fa fa-google-plus blue-text" />
</GoogleLogin>
<SocialButton class="btn btn-fb"
provider='facebook'
appId='183353488972514'
onLoginSuccess={handleSocialLogin}
onLoginFailure={handleSocialLoginFailure}
>
<i class="fa fa-facebook"></i>
</SocialButton>
</div>
    </form>


</div>

<div class="col">
    </div>

</div>

    );
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Input } from 'mdbreact';


export default class Login extends Component {

  render() {
    return (
<div>
<h2 className="mb-5">Form login</h2>
<form>
    <p className="h5 text-center mb-4">Sign in</p>
    <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
    <Input label="Type your password" icon="lock" group type="password" validate/>
    <div className="text-center">
        <Button>Login</Button>

<div>
        <a type="button" className="btn-floating btn-lg btn-fb" ><i className="fa fa-facebook"></i></a>
        <a type="button" className="btn-floating btn-lg btn-gplus" ><i className="fa fa-google-plus"></i></a>
        </div>
    </div>
</form>
</div>

    );
  }
}

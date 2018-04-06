import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Register extends Component {

  render() {
    return (

<div class="row">

 <div class="col">
    </div>

<div class="col">

<div class="card">

    <div class="card-body">

        <form>
            <p class="h4 text-center py-4">Sign up</p>

            <div class="md-form">
                <i class="fa fa-user prefix grey-text"></i>
                <input type="text" id="materialFormCardNameEx" class="form-control" />
                <label for="materialFormCardNameEx" class="font-weight-light">Your name</label>
            </div>

            <div class="md-form">
                <i class="fa fa-envelope prefix grey-text"></i>
                <input type="email" id="materialFormCardEmailEx" class="form-control" />
                <label for="materialFormCardEmailEx" class="font-weight-light">Your email</label>
            </div>

            <div class="md-form">
                <i class="fa fa-exclamation-triangle prefix grey-text"></i>
                <input type="email" id="materialFormCardConfirmEx" class="form-control" />
                <label for="materialFormCardConfirmEx" class="font-weight-light">Confirm your email</label>
            </div>

            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input type="password" id="materialFormCardPasswordEx" class="form-control" />
                <label for="materialFormCardPasswordEx" class="font-weight-light">Your password</label>
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

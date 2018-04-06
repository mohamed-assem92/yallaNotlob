import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Home extends Component {

  render() {
    return (

<div  className='login-form'>
  <section class="pt-5 mt-3 pb-3">
    <h1 class="h1 font-weight-bold text-center mb-5 pt-2">Home</h1>

       <div class="row">

         <div class="col-md-6 col-lg-4">

          <div class="card card-personal">

             <div class="card-body">
                  <a><h1 class="card-title title-one">Latest Orders</h1></a>
                    <h4 class="card-meta">Dinner 2013-8-4 </h4>
                    <h4 class="card-meta">breakfast 2013</h4>
                    <h4 class="card-meta">lunch 2013</h4>
                    <hr/>

              </div>

          </div>

      </div>

    <div class="col-md-6 col-lg-4">
          <div class="card card-personal">
             <div class="card-body">
              <a><h2 class="card-title title-one">friends activity</h2></a>
              <h5 class="card-meta">ahmed ordered</h5>
              <hr/>
              </div>

          </div>

    </div>

  </div>

    </section>


</div>

    );
  }
}

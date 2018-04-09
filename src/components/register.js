import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import ReactDOM from 'react-dom';
import Login from './login';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      psw:'',
      conPsw:'',
      errorMsg:'',
      files: []    }
  }
  getFiles(files){
      this.setState({ files: files })
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
    if(this.state.psw != this.state.conPsw )
     {

      this.setState({errorMsg:'invalid Password'});

     }else if(this.state.name=='')
     {
      this.setState({errorMsg:'User Name is Required'});
     }
     else if(this.state.email=='')
     {
      this.setState({errorMsg:'Email is Required'});
     }
     else{
       const user = {
         name: this.state.name,
         email: this.state.email,
         password: this.state.psw,
        //  files: this.state.files.base64
       };
       console.log(user)
       fetch('http://localhost:3001/users', {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>{ if(response.status == true){
      ReactDOM.render(<Login />, document.getElementById('root'));
    }
  }
  );


     }

    event.preventDefault();
  }

  render() {
    return (

<div class="row">

 <div class="col">
    </div>

<div class="col">


<form onSubmit={this.handleSubmit}>
    <p class="h4 text-center mb-4">Sign up</p>


    <label for="defaultFormRegisterNameEx" class="grey-text">Your name</label>
    <input name="name" onChange={this.handleChangeName} type="text" id="defaultFormRegisterNameEx" class="form-control" />
    <label>
            { this.state.errorMsg =='User Name is Required'?
            <label>
             {this.state.errorMsg}
            </label>
             :''}
            </label>
    <br/>


    <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
    <input name="email" onChange={this.handleChangeEmail} type="email" id="defaultFormRegisterEmailEx" class="form-control" />
    <label>
            { this.state.errorMsg =='Email is Required'?
            <label>
             {this.state.errorMsg}
            </label>
             :''}
            </label>
    <br/>

    <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
    <input name="psw" onChange={this.handleChangePsw} type="password" id="defaultFormRegisterPasswordEx" class="form-control" />
    <label>
            { this.state.errorMsg =='invalid Password'?
            <label>
             {this.state.errorMsg}
            </label>
             :''}
            </label>
    <br/>

    <label for="defaultFormRegisterPasswordEx" class="grey-text">Confirm Your password</label>
    <input name="conPsw" onChange={this.handleChangeConfPsw} type="password" id="defaultFormRegisterConPasswordEx" class="form-control" />
    <label>
            { this.state.errorMsg =='invalid Password'?
            <label>
             {this.state.errorMsg}
            </label>
             :''}
            </label>
          <br/>
          <label for="defaultFormRegisterPasswordEx" class="grey-text">Upload Your photo</label>

            <FileBase64
       multiple={ false }
       onDone={ this.getFiles.bind(this) } />
    <div class="text-center mt-4">

        <button class="btn btn-blue" onChange type="submit">Register</button>
    </div>
</form>


</div>



<div class="col">
    </div>

    </div>

    );
  }
}

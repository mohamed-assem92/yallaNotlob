import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import { Link } from "react-router-dom";
import "./groups.css";
const uuidv4 = require('uuid/v4');


export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupsArray: [],
      inputValue: '',
      showOneGroup: false,
      currentGroupID: 0,
    };
  }
  componentWillMount() {
    fetch(`http://192.168.1.9:3001/users/1/groups`)
      .then(response => response.json())
      .then(json => {
        let groupsArr = json;
        this.setState({ groupsArray: groupsArr })
      });
  }

  addGroup() {
    if (this.state.inputValue) {
      fetch(`http://192.168.1.9:3001/users/1/groups`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.inputValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          let newGroup = this.state.groupsArray;
          console.log(json);
          newGroup.push(json.message);
          this.setState({ groupsArray: newGroup });
        })
    }
    else {
      console.log("input Empty");
    }
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  deleteGroup(e, gId) {
    e.preventDefault;
    fetch(`http://192.168.1.9:3001/users/1/groups/${gId}`, {
      method: 'DELETE',

    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          this.setState({ groupsArray: json.message })
        }
      })
  }

  showGroup(e, gID) {
    // console.log(gID);
    e.preventDefault;
    this.setState({ showOneGroup: !this.state.showOneGroup, currentGroupID: gID })
  }

  render() {
    return (

      <div className="container">
        <h1 className="header">
          Groups
      </h1>
        <div className="all row">
          <div className="groups col-md-6">
            <h3>Groups</h3><br />
            <span className="row inputs">
              <input onChange={this.updateInputValue.bind(this)} className="addGruop form-control col-md-6" /><input type="button" onClick={this.addGroup.bind(this)} className="addGruop btn btn-primary pull-right" value="Add" />
            </span>
            {this.state.groupsArray.map((group) => {
              return (
                <div className="links row" key={uuidv4()}>
                  <div className="col-md-12">
                    <Link onClick={(e) => { this.showGroup(e, group.id) }} key={uuidv4()} to={"/groups/"}>{group.name}</Link>
                    <div key={uuidv4()} className="pull-right">
                      <Link key={uuidv4()} to={"/groups/"}><i className="fa fa-user-plus" aria-hidden="true"></i></Link><span>  </span>
                      <Link onClick={(e) => { this.deleteGroup(e, group.id) }} key={uuidv4()} to={"/groups/"}><i className="fa fa-times-circle" aria-hidden="true"></i></Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="friends col-md-6">
            {this.state.showOneGroup && < Friends gid={this.state.currentGroupID} />}
          </div>
        </div>
      </div>

    );
  }
}

class Friends extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      groupID: this.props.gid,
      currentGroup: [],
      inputValue: '',
    };
  }
  componentWillMount() {
    fetch(`http://192.168.1.9:3001/users/1/groups/${this.state.groupID}/users`)
      .then(response => response.json())
      .then(json => {
        let group = json;
        this.setState({ currentGroup: group })
        // console.log(this.state.currentGroup);
      });
  }
  removeFriend(e, fID) {
    e.preventDefault;
    fetch(`http://192.168.1.9:3001/users/1/groups/${this.state.groupID}/friends/${fID}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          this.setState({ currentGroup: json.message })
        }
      })
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  addFriend() {
    if (this.state.inputValue) {
      fetch(`http://192.168.1.9:3001/users/1/groups/${this.state.groupID}/friends`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.inputValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          let newGroup = this.state.currentGroup;
          console.log(json);

          if(json.status){

            newGroup.push(json.message);
            this.setState({ currentGroup: newGroup });
          }

        })
    }
    else {
      console.log("input Empty");
    }
  }
  render() {
    return (
      <div>
        <h3>Friends</h3>
        <span className="row inputs">
          <input onChange={this.updateInputValue.bind(this)} className="addGruop form-control col-md-6" /><input type="button" onClick={this.addFriend.bind(this)} className="addGruop btn btn-primary pull-right" value="Add" />
        </span>
        {this.state.currentGroup.map((friend) => {
          return (
            <div className="cardDiv" key={uuidv4()}>
              <Card key={uuidv4()}>
                <CardImage key={uuidv4()} className="img-circle" src="https://picsum.photos/200/300/?random" />
                <CardBody className="cardName" key={uuidv4()}>
                  <CardTitle key={uuidv4()}>{friend.name}</CardTitle>
                  <Button onClick={(e) => { this.removeFriend(e, friend.id) }} key={uuidv4()}>Remove</Button>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

import React, { Component } from "react";
import "./UserProfile.css";
import userimage from '../ChatList/user.jpeg'

export default class UserProfile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    fetch("/profile",
    {
      method: 'post',
      headers: new Headers({
        'Authorization': 'Bearer '+ localStorage.getItem('csrfToken'), 
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
    .then( result => {
      console.log(result);
      this.setState({user:result})
        }).catch(err => {
            console.log(err)
        })
  }
  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={userimage}/>
          </div>
          <h4>{this.state.user.name}</h4>
          <p>{this.state.user.email}</p>
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ultrices urna a imperdiet egestas. Donec in magna quis ligula
          </div>
        </div>
      </div>
    );
  }
}
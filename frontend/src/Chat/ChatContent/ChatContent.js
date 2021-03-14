  
import React, { Component, useState, createRef, useEffect } from "react";

import "./ChatContent.css";
import Avatar from "./Avatar"
import ChatItem from "./ChatItem";
import userimage from '../ChatList/user.jpeg'
import socketIOClient from "socket.io-client";
export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [];

  constructor(props) {
    super(props);
    this.state = {
      currentConvo:this.props.currentConvo,
      name:this.props.name,
      chat: this.chatItms,
      msg: "",
      userToken:localStorage.getItem('jwt')
    };
    console.log(props);
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  updateUser(){
    console.log(this.state)
    fetch("/messages/"+this.props.currentConvo,
    {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${this.state.userToken}`, 
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
    .then( result => {
      console.log(result);
      var obj=[];
      var counter=0;
      result.forEach(element => {
        if(element.from==localStorage.getItem('id')){
          var ob={
            key:++counter,
            image:userimage,
            msg:element.body,
            type:""
          }
        }
        else{
          var ob={
            key:++counter,
            image:userimage,
            msg:element.body,
            type:"other"
          }
        }
        obj.push(ob);
      });
      
      this.setState({
        chat:obj,
        name:this.props.name
      });
      console.log(this.state);
        }).catch(err => {
            console.log(err)
        })
  }
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              userimage,
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
    
    fetch("/conversations/"+localStorage.getItem('id'),
    {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${this.state.userToken}`, 
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
    .then( result => {
      var myid=result[result.length-1]._id;
      console.log(result);
      var name=result[result.length-1].recipients.filter(item=>{
        return item._id!==localStorage.getItem('id');
      });
      console.log(name);
      name=name[0].name;
      this.props.handler(myid,name);
      console.log(myid);
        }).catch(err => {
            console.log(err)
        })
        this.updateUser();
  }
  componentDidUpdate(prevProps) {
    if(this.props.currentConvo!== prevProps.currentConvo) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.updateUser();
    }
  } 
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };
  onenter=(e) =>{
    document.getElementById("sendMsgBtn").addEventListener("click",(e)=>{
      if (this.state.msg !== "") {
        this.chatItms.push({
          key: 1,
          type: "",
          msg: this.state.msg,
          image:
          userimage,
        });
        /*
        fetch('/chat',{
         method: 'post',
         headers: new Headers({
          'Authorization': `Bearer ${this.state.userToken}`, 
          'Content-Type': 'application/json'
         }),
         body: JSON.stringify({body: this.state.msg, to: 'receiver id'})
        })*/
        this.setState({ chat: [...this.chatItms] });
        this.scrollToBottom();
        this.setState({ msg: "" });
      }
    });
  };
  onADD() {
    document.querySelector(".main__chatlist").style.display = "block";
    document.querySelector(".main__chatcontent").style.display = "none";
    return console.log("ghavshb");
  }
  
  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image={userimage}
              />
               <p>{this.state.name}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
            <button className="btn-nobg" onClick={this.onADD}>
                <i
                  style={{ color: "black", padding: "2px" }}
                  className="fa fa-plus"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn" onClick={this.onenter}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
  


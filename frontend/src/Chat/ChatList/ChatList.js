import React, { Component } from 'react'
import './ChatList.css'
import ChatListItems from './ChatListItems'
import userimage from './user.jpeg'
export default class ChatList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allChats: [],
      userToken:localStorage.getItem('jwt')
    };
    this.findAllChatUsers=this.findAllChatUsers.bind(this);
  }
  findAllChatUsers(){
    fetch('/conversations/604b356433ba894e0a52ca21',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${this.state.userToken}`, 
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
    .then( result => {
      console.log(result);
      var data=[];
      result.forEach(item=>{
        item.recipients.filter(friend=>{
          let id=item._id;
          if(friend._id!==localStorage.getItem('id')){
            data.push({friend,id});
          }
        })
      })
      console.log(data);
      var myobj=[];
      data.forEach(item=>{
        myobj.push(item[0]);
      })
      this.setState({
        allChats:data
      });
      console.log(this.state.allChats);
        }).catch(err => {
            console.log(err)
        })
  }
  componentWillMount(){
    this.findAllChatUsers();
  }
  
  onCross() {
    document.querySelector(".main__chatlist").style.display = "none";
    document.querySelector(".main__chatcontent").style.display = "block";
    return console.log("ghavshb");
  }
  render() {
    return (
      <div className="main__chatlist">
        <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <button className="btn-nobg cross" style={{float:"right"}} onClick={this.onCross}>
                <i
                  style={{ color: "black", padding: "2px",float:"right" }}
                  className="fa fa-remove"
                ></i>
          </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
                    {this.state.allChats.map((item, index) => {
                        return (
                        <ChatListItems
                            name={item.friend.name}
                            key={item.friend._id}
                            animationDelay={index + 1}
                            active={item.friend.active ? "active" : ""}
                            isOnline={item.friend.isOnline ? "active" : ""}
                            image={userimage}
                            id={item.id}
                            handler={this.props.handler}
                        />
                        );
                    })}
                </div>
      </div>
    )
}}
    
      

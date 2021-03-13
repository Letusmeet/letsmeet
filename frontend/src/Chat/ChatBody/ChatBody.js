import React, { Component } from 'react'
import ChatContent from '../ChatContent/ChatContent'
import ChatList from '../ChatList/ChatList'
import UserProfile from '../UserProfile/UserProfile'
import './ChatBody.css'

export default class ChatBody extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            currentConvo:"",
            name:""
        }
        this.handler=this.handler.bind(this);
      }    
      handler(id,name) {
        this.setState({
          currentConvo:id,
          name:name
        })
        console.log(this.state);
      }
    render() {
        return (
            <div className="main__chatbody">
                <ChatList handler = {this.handler}/>
                <ChatContent handler = {this.handler} currentConvo={this.state.currentConvo} name={this.state.name}/>
                <UserProfile handler = {this.handler}/>
            </div>
        )
    }
}

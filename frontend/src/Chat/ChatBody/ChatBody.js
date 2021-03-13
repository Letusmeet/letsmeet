import React, { Component } from 'react'
import ChatContent from '../ChatContent/ChatContent'
import ChatList from '../ChatList/ChatList'
import UserProfile from '../UserProfile/UserProfile'
import './ChatBody.css'

export default class ChatBody extends Component {
    render() {
        return (
            <div className="main__chatbody">
                <ChatList/>
                
                <ChatContent/>
                <UserProfile/>
            </div>
        )
    }
}

import React from 'react';
import AuthNav from '../base/AuthNav';
import Footer from '../base/Footer';
import UnAuthNav from '../base/UnAuthNav';
import './Chat.css'
import ChatBody from './ChatBody/ChatBody'
import NavChat from './NavChat/NavChat';
const Chat=()=>{
    const [authenticated, setAuthenticated] = React.useState(true);
    return (
    <>
        <div className="__main">
            <NavChat/>
            <ChatBody/>

        </div>
        
    </>
      
    )
}
export default Chat;
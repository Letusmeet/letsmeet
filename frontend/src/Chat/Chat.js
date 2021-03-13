<<<<<<< HEAD
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
=======
import React from 'react';
import './Chat.css'
import ChatBody from './ChatBody/ChatBody'
import NavChat from './NavChat/NavChat';
const Chat=()=>{
    return (
        <div className="__main">
            <NavChat/>
            <ChatBody/>
        </div>
    )
}
>>>>>>> d56141d5f7b802c136640e5fe45b86278e756805
export default Chat;
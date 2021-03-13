import React from "react";
import "./Chat.css";
import ChatBody from "./ChatBody/ChatBody";
import NavChat from "./NavChat/NavChat";
const Chat = () => {
  return (
    <div className="__main">
      <NavChat />
      <ChatBody />
    </div>
  );
};
export default Chat;

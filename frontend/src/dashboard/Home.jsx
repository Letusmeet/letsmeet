import React from "react";
import DashboardNav from "./DashboardNav";
import RoomList from "./room/RoomList";
import { Row, Col } from "react-bootstrap";
import UserList from "./UserList";
import Chatcontent from "../Chat/ChatContent/ChatContent";
function Home() {
  const [currentConvo, setCurrentConvo] = React.useState("");
  const [name, setName] = React.useState("");
  function handler(id, name) {
    setName(name);
    setCurrentConvo(id);
    console.log(currentConvo, name);
  }
  return (
    <>
      <DashboardNav no={1} />
      <Row>
        <Col xs="12" lg="4">
          <div style={{ marginLeft: "10px" }}>
            <RoomList />
          </div>
        </Col>
        <Col xs="12" lg="4">
          <Chatcontent
            handler={handler}
            currentConvo={currentConvo}
            name={name}
          ></Chatcontent>
        </Col>
        <Col xs="12" lg="4">
          <UserList />
        </Col>
      </Row>
    </>
  );
}

export default Home;

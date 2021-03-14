import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import BoardList from "./board/BoardList";
import DashboardNav from "./DashboardNav";
import RoomList from "./room/RoomList";
import { Container, Row, Col } from "react-bootstrap";
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
        <Col xs lg="4">
          <div style={{ marginLeft: "20px" }}>
            <RoomList />
          </div>
        </Col>
        <Col xs lg="4">
          <Chatcontent
            handler={handler}
            currentConvo={currentConvo}
            name={name}
          ></Chatcontent>
        </Col>
        <Col xs lg="4">
          <UserList />
        </Col>
      </Row>
    </>
  );
}

export default Home;

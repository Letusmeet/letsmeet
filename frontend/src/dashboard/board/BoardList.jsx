import React from "react";
import Board from "./Board";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import RoomUserList from "../room/RoomUserList";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function BoardList(props) {
  const [boardListArray, setBoardListArray] = React.useState([]);
  const classes = useStyles();
  let roomId;
  try {
    roomId = props.location.aboutProps.roomId;
  } catch (error) {
    roomId = window.localStorage.getItem("roomId");
  }

  //get post list
  React.useEffect(() => {
    console.log("Bearer " + window.localStorage.getItem("csrfToken"));
    axios
      .get(`fetchboard/${roomId}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
          window.localStorage.setItem("roomId", roomId);
          setBoardListArray(arr);
        } else {
          console.log("errr", response);
          //error message
        }
      })
      .catch((err) => {
        console.log("error" + err);
        //invalid
      });
  }, []);

  return (
    <>
      <DashboardNav no={2} roomId={roomId} />

      <Container>
        <NavLink
          to={{
            pathname: "/createboard",
            aboutProps: {
              roomId: roomId,
            },
          }}
          exact
          activeClassName="active_nav"
          className="nav-link"
        >
          <div style={{ marginLeft: "65%" }}>
            <Button>
              <AddIcon style={{ color: "#de3e4d", fontWeight: "bold" }} />
            </Button>
          </div>
        </NavLink>
      </Container>
      <Row>
        <Col xs="12" lg="8">
          <Row>
            {boardListArray.map((boards) => (
              <Col key={boards.id} xs="12" lg="3">
                <div className="shadow  mb-2 bg-body rounded">
                  <NavLink
                    to={{
                      pathname: "/cardlist",
                      aboutProps: {
                        boardId: boards._id,
                        title: boards.title,
                      },
                    }}
                    exact
                    activeClassName="active_nav"
                    className="nav-link"
                  >
                    <Board board={boards} />
                  </NavLink>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs="12" lg="4">
          <RoomUserList />
        </Col>
      </Row>
    </>
  );
}

export default BoardList;

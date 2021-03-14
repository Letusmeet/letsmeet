import React from "react";
import Board from "../board/Board";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import Room from "./Room";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function RoomList() {
  const [roomListArray, setRoomListArray] = React.useState([]);
  const classes = useStyles()

  //get room list
  React.useEffect(() => {
    setRoomListArray([]);
    console.log("Bearer " + window.localStorage.getItem("csrfToken"));
    axios
      .get(`/fetchroom/${window.localStorage.getItem("officeID")}`, {
        headers: {
          Authorization:"Bearer " + window.localStorage.getItem("csrfToken"),
          ContentType:"application/json"
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
          console.log(response.data);
          setRoomListArray(arr);
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
      <NavLink
        to="/createroom"
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

      {roomListArray.map((room) => (
        <Button key={room._id}>
          <NavLink
            to={{
              pathname: "/boardlist",
              aboutProps: {
                roomId: room._id,
                roomName: room.name,
                decription: room.decription,
              },
            }}
            exact
            activeClassName="active_nav"
            className="nav-link"
          >
            <Room rooms={room} />
          </NavLink>
        </Button>
      ))}
    </>
  );
}

export default RoomList;

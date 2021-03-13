import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from "../../base/Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function CreateRoom() {
  const history = useHistory();

  //submit button toggle
  const [disable, setdisable] = useState(true);

  //getting onchange usestate
  const [name, setName] = useState({
    roomName: "",
    description: "",
  });

  //onchange event
  const inputEvent = (e) => {
    const changeName = e.target.name;
    const changeValue = e.target.value;
    console.log(changeName, changeValue);

    // update input value
    setName((previous) => {
      if (changeName === "roomName") {
        return {
          roomName: changeValue,
          description: previous.description,
        };
      } else if (changeName === "description") {
        return {
          roomName: previous.roomName,
          description: changeValue,
        };
      }
    });

    //submit button state check on or of
    name.roomName === "" || name.description === ""
      ? setdisable(true)
      : setdisable(false);
  };

  // on form submit
  const onSubmits = async (e) => {
    e.preventDefault();
    console.log("submitted");

    axios
      .post(
        `/createroom/${window.localStorage.getItem("officeID")}`,
        {
          description: name.description,
          roomname: name.roomName,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        if (response.status == 200) {
          history.push("/home"); //send to home
        }
      })
      .catch((err) => {
        console.error("error");
      });
  };
  const classes = useStyles();
  return (
    <>
      <div className="signup_outer shadow-lg   rounded">
        <form
          onSubmit={onSubmits}
          style={{ textAlign: "center" }}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            required={true}
            label="Room Name"
            autoComplete="off"
            value={name.roomName}
            onChange={inputEvent}
            name="roomName"
          />
          <TextField
            required={true}
            label="Description"
            autoComplete="off"
            value={name.description}
            onChange={inputEvent}
            name="description"
          />
          <Row
            style={{
              width: "90%",
            }}
          >
            <Col>
              <Button type="submit" variant="contained" color="primary">
                cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disable}
              >
                Create
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <Footer />
    </>
  );
}

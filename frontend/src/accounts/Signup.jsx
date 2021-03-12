import React, { useState } from "react";
// import UserAuth from "./UserAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Row, Col, Alert } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function Login(props) {
  const history = useHistory();

  // term and condition
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => setChecked(event.target.checked);

  //submit button toggle
  const [disable, setdisable] = useState(true);

  //user error msg
  const [logMsg, setLogMsg] = useState();

  //getting onchange usestate
  const [name, setName] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  //onchange event
  const inputEvent = (e) => {
    const changeName = e.target.name;
    const changeValue = e.target.value;

    // update input value
    setName((previous) => {
      if (changeName === "email") {
        return {
          email: changeValue,
          username: previous.username,
          password1: previous.password1,
          password2: previous.password2,
        };
      } else if (changeName === "username") {
        return {
          email: previous.email,
          username: changeValue,
          password1: previous.password1,
          password2: previous.password2,
        };
      } else if (changeName === "password1") {
        return {
          email: previous.email,
          username: previous.username,
          password1: changeValue,
          password2: previous.password2,
        };
      } else if (changeName === "password2") {
        return {
          email: previous.email,
          username: previous.username,
          password1: previous.password1,
          password2: changeValue,
        };
      }
    });

    //submit button state check on or of
    name.email === "" ||
      name.username === "" ||
      name.password1 === "" ||
      name.password2 === "" ||
      checked === false
      ? setdisable(true)
      : setdisable(false);
  };

  // on form submit
  const onSubmits = async (e) => {
    e.preventDefault();
    console.log("submitted");

    axios
      .post("/signup", {
        email: name.email,
        password: name.password1,
        name: name.username,
        // password2: name.password2,
      })
      .then(async (response) => {
        if (response.status == 200) {
          history.push("/login"); //send to login
        }
      })
      .catch((err) => {
        setLogMsg("please enter all detail or user exits");
      });
  };
  const classes = useStyles();
  return (
    <div className="signup_outer shadow-lg   rounded">
      <Alert style={{ textAlign: "center" }} variant="danger">
        {logMsg}
      </Alert>
      <form
        onSubmit={onSubmits}
        style={{ textAlign: "center" }}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          required={true}
          label="username"
          autoComplete="off"
          value={name.username}
          onChange={inputEvent}
          name="username"
        />
        <TextField
          required={true}
          label="Email"
          autoComplete="off"
          value={name.email}
          onChange={inputEvent}
          name="email"
        />
        <TextField
          required={true}
          label="Password"
          type="password"
          autoComplete="current-password"
          value={name.password1}
          onChange={inputEvent}
          name="password1"
        />
        <TextField
          required={true}
          label="confirm Password"
          type="password"
          autoComplete="current-password"
          value={name.password2}
          onChange={inputEvent}
          name="password2"
        />
        <div>
          <Checkbox
            checked={name.checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="checkbox"
          />
          <small>I accept term and condition</small>
        </div>

        <Row
          style={{
            width: "90%",
          }}
        >
          <Col>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Col>
          <Col>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
            >
              Signup
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

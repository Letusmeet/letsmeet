import React, { useState, useContext } from "react";
// import UserAuth from "./UserAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Row, Col, Alert } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UserAuth from "../accounts/UserAuth";
import Footer from "../base/"
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function Login(props) {
  const { setAuthenticated } = useContext(UserAuth);
  const history = useHistory();

  //submit button toggle
  const [disable, setdisable] = useState(true);

  //user error msg
  const [logMsg, setLogMsg] = useState();

  //getting onchange usestate
  const [name, setName] = useState({
    email: "",
    password: "",
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
          password: previous.password,
        };
      } else {
        return {
          email: previous.email,
          password: changeValue,
        };
      }
    });
    //submit button state check on or off
    name.email === "" || name.password === ""
      ? setdisable(true)
      : setdisable(false);
  };

  // on form submit
  const onSubmits = async (e) => {
    e.preventDefault();

    console.log("submitted");

    axios
      .post("/signin", {
        email: name.email,
        password: name.password,
      })
      .then(async (response) => {
        console.log(response.status);
        if (response.status == 200) {
          setAuthenticated(true);
          window.localStorage.setItem("csrfToken", response.data.token);
          window.localStorage.setItem("isAuth", true);
          window.localStorage.setItem("id", response.data.user._id);
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.error("err :" + err);
        setLogMsg("Opps! Please try again");
      });
  };

  const classes = useStyles();

  return (
    <>
    <div className="login_outer shadow-lg   rounded">
      {/* message error */}
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
          id="standard-basic"
          label="Email"
          autoComplete="off"
          value={name.email}
          onChange={inputEvent}
          name="email"
        />
        <TextField
          required={true}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={name.password}
          onChange={inputEvent}
          name="password"
        />
        <Row
          style={{
            width: "90%",
          }}
        >
          <Col>
            <Button variant="contained" color="primary">
              <small style={{ fontSize: "0.6rem" }}>forget password</small>
            </Button>
          </Col>
          <Col>
            <Button
              style={{ padding: "11px 40px 11px 40px" }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
            >
              Login
            </Button>
          </Col>
        </Row>
      </form>
     
    </div>
     <Footer/>
     </>
  );
}

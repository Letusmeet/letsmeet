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
import Footer from "../base/Footer";
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
    <>
     <Alert style={{ textAlign: "center" }} variant="danger">
        {logMsg}
      </Alert>
     <div class="log_container">
      
      <div class="page"> 
        <h1>Hello Friend!</h1>
        <p>Suspendisse porttitor mi id magna mollis, eget hendrerit justo volutpat. Vivamus nec arcu sed mauris posuere aliquam.</p>
        <div class="shape1" id="shape"></div>
        <div class="shape2" id="shape"></div>
      </div>
      <div class="log_form"> 
        <h2>Create an account</h2>
        {/* <!-- <div class="sns">
          <div class="circle1"><img src="https://www.flaticon.com/svg/static/icons/svg/1384/1384053.svg" width="30"/></div>
          <div class="circle1 tw"><img src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg" width="30"/></div>
          <div class="circle1 goo"><img src="https://www.flaticon.com/svg/static/icons/svg/2875/2875404.svg" width="30"/></div>
        </div>
        <p>or use your email for registration</p> --> */}
        <form  onSubmit={onSubmits}
       
        className={classes.root}
        noValidate
        autoComplete="off">
        <input className="searchTerm" type="text" required={true}
        label="username"
        autoComplete="off"
        value={name.username}
        onChange={inputEvent}
        name="username" placeholder="Name"/>

        <input class="searchTerm" required={true}
        label="Email"
        autoComplete="off"
        value={name.email}
        onChange={inputEvent}
        name="email" type="text" placeholder="E-mail"/>

        <input class="searchTerm" type="text"
        required={true}
            label="Password"
            type="password"
            autoComplete="current-password"
            value={name.password1}
            onChange={inputEvent}
            name="password1" placeholder="Password"/>
        <input class="searchTerm" type="text"
        required={true}
            label="confirm Password"
            type="password"
            autoComplete="current-password"
            value={name.password2}
            onChange={inputEvent}
            name="password2" placeholder="Confirm Password"/>

        <label for="checkbox">
          <input type="checkbox" checked={name.checked}
          onChange={handleChange}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          name="checkbox"/> I accept terms and condition
        </label>
        
        <div class="button"><button type="submit" href="#">sign up</button></div>
      </form>
      </div>
    </div>
    </>
  );
}

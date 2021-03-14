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
        if (response.status == 200) {
          setAuthenticated(true);
          window.localStorage.setItem("csrfToken", response.data.token);
          window.localStorage.setItem("isAuth", true);
          window.localStorage.setItem("UserId", response.data.user._id);

          if (response.data.user.office == undefined) {
            history.push("/createoffice");
          } else {
            console.log(response.data.user.office);
            window.localStorage.setItem("officeID", response.data.user.office);
            history.push("/home");
          }
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
          <h2>LogIn with your Account</h2>
          <div class="sns">
            <div class="circle1"><img src="https://www.flaticon.com/svg/static/icons/svg/1384/1384053.svg" width="30"/></div>
            <div class="circle1 tw"><img src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg" width="30"/></div>
            <div class="circle1 goo"><img src="https://www.flaticon.com/svg/static/icons/svg/2875/2875404.svg" width="30"/></div>
          </div>
          <p>or use your email for Login</p>
          <form  onSubmit={onSubmits}
          
          className={classes.root}
          noValidate
          autoComplete="off">

          <input class="searchTerm" required={true}
          id="standard-basic"
          label="Email"
          autoComplete="off"
          value={name.email}
          onChange={inputEvent}
          name="email" type="text" placeholder="E-mail"/>

          <input class="searchTerm" type="text" required={true}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={name.password}
          onChange={inputEvent}
          name="password" placeholder="Password"/>

          <button>Forget Password ? </button>
          {/* <!-- <input class="searchTerm" type="text" placeholder="Confirm Password"/>
          <label for="checkbox">
            <input type="checkbox" name="" id=""> I accept terms and condition
          </label> --> */}
          
          <div class="button"><button  type="submit"
            variant="contained"
            color="primary"
            disabled={disable}>Sign in</button></div>
        </form>
        </div>
      </div>
    </>
  );
}

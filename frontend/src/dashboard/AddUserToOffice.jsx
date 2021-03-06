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

export default function AddUserToOffice(props) {
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
      .post(
        `/adduseroffice/${props.userId}/${"officeID"}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        if (response.status == 200) {
          console.log(response);
          history.push("/home");
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
      <div className="login_outer shadow-lg   rounded">added</div>
      <Footer />
    </>
  );
}

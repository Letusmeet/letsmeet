import React, { useState, useContext } from "react";
// import UserAuth from "./UserAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Row, Col, Alert } from "react-bootstrap";
import "../accounts/Login.css";
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
  const history = useHistory();

  //submit button toggle
  const [disable, setdisable] = useState(true);

  //getting onchange usestate
  const [officeName, setOfficeName] = useState("");

  //onchange event
  const inputEvent = (e) => {
    const changeValue = e.target.value;

    // update input value
    setOfficeName(changeValue);
    //submit button state check on or off
    officeName === "" ? setdisable(true) : setdisable(false);
  };

  // on form submit
  const onSubmits = async (e) => {
    e.preventDefault();

    console.log("submitted");

    axios
      .post(
        "/createoffice",
        {
          officename: officeName,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        console.log(response.data);
        if (response.status == 200) {
          console.log(response);
          window.localStorage.setItem("officeID", response.data);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.error("err :" + err);
      });
  };

  const classes = useStyles();

  return (
    <>
      <div className="login_outer shadow-lg   rounded">
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
            label="Office Name"
            autoComplete="off"
            value={officeName}
            onChange={inputEvent}
            name="office_name"
          />
          <Row
            style={{
              width: "90%",
            }}
          >
            <Col>
              <Button
                style={{ padding: "11px 40px 11px 40px" }}
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
    </>
  );
}

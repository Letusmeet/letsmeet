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

export default function CreateBoard(props) {
  const history = useHistory();

  //submit button toggle
  const [disable, setdisable] = useState(true);

  //getting onchange usestate
  const [name, setName] = useState({
    title: "",
    description: "",
  });

  //onchange event
  const inputEvent = (e) => {
    const changeName = e.target.name;
    const changeValue = e.target.value;
    console.log(changeName, changeValue);

    // update input value
    setName((previous) => {
      if (changeName === "title") {
        return {
          title: changeValue,
          description: previous.description,
        };
      } else if (changeName === "description") {
        return {
          title: previous.title,
          description: changeValue,
        };
      }
    });

    //submit button state check on or of
    name.title === "" || name.description === ""
      ? setdisable(true)
      : setdisable(false);
  };

  // on form submit
  const onSubmits = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log("props" + props.location.aboutProps.roomId);
    const roomId = await props.location.aboutProps.roomId;
    axios
      .post(
        `/createboard/${roomId}`,
        {
          description: name.description,
          title: name.title,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        if (response.status == 200) {
          history.push({
            pathname: "/boardlist",
            state: { roomId: props.location.aboutProps.roomId },
          });
        }
      })
      .catch((err) => {
        console.error(err);
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
            label="Board Title"
            autoComplete="off"
            value={name.title}
            onChange={inputEvent}
            name="title"
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
    </>
  );
}

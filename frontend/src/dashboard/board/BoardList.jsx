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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function BoardList(props) {
  console.log(props);
  const [boardListArray, setBoardListArray] = React.useState([]);
  const classes = useStyles();

  //get post list
  React.useEffect(() => {
    console.log("Bearer " + window.localStorage.getItem("csrfToken"));
    axios
      .get(`fetchboard/${props.location.aboutProps.roomId}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
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
      <DashboardNav />

      <Container>
        <NavLink
          to={{
            pathname: "/createboard",
            aboutProps: {
              roomId: props.location.aboutProps.roomId,
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

        <Row>
          {boardListArray.map((office) => (
            <Col key={office.id} xs="12" lg="4">
              <div className="shadow  mb-2 bg-body rounded">
                <Board office={office} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default BoardList;

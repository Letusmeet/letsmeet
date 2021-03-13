import React from "react";
import Board from "./Board";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import Room from "./Room";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function RoomList() {
  //   const [officeListArray, setOfficeListArray] = React.useState([]);
  //   const classes = useStyles();

  //   //get post list
  //   React.useEffect(() => {
  //     console.log("Bearer " + window.localStorage.getItem("csrfToken"));
  //     axios
  //       .get(`boards/${window.localStorage.getItem("id")}`, {
  //         headers: {
  //           Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status == 200) {
  //           const arr = response.data;
  //           setOfficeListArray(arr);
  //         } else {
  //           console.log("errr", response);
  //           //error message
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("error" + err);
  //         //invalid
  //       });
  //   }, []);

  return (
    <>
      <div style={{ marginLeft: "65%" }}>
        <Button>
          <AddIcon style={{ color: "#de3e4d", fontWeight: "bold" }} />
        </Button>
      </div>
      {/* <Row>
          {officeListArray.map((office) => (
            <Col key={office.id} xs="12" lg="4">
              <div className="shadow  mb-2 bg-body rounded">
                <Room />
              </div>
            </Col>
          ))}
        </Row> */}
      <Room />
      <Room />
      <Room />
    </>
  );
}

export default RoomList;

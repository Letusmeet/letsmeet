import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import Board from "./Board";
import { Container, Row, Col, Nav } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function OfficeList() {
  return (
    <>
      <Container>
        <div className="shadow-sm p-3 mb-5 bg-body rounded">
          <Row>
            <Col lg="2">
              <NavLink
                to="/home"
                exact
                activeClassName="active_nav"
                className="nav-link"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<HomeIcon />}
                >
                  Home
                </Button>
              </NavLink>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default OfficeList;

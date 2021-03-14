import { Container, Row, Col, Nav } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { NavLink, Switch, Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Dashboard(props) {
  console.log(props.no);
  return (
    <Container>
      <div className="shadow-sm p-3 mb-5 bg-body rounded">
        {(() => {
          if (props.no == 1) {
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Home
                </Link>
              </Breadcrumbs>
            );
          } else if (props.no == 2) {
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <NavLink
                  to="/home"
                  exact
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Home
                </NavLink>
                <Link
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Boardlist
                </Link>
              </Breadcrumbs>
            );
          } else {
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <NavLink
                  to="/home"
                  exact
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/boardlist"
                  exact
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Boardlist
                </NavLink>
                <Link
                  activeClassName="active_nav"
                  className="nav-link"
                  color="inherit"
                >
                  Cardlist
                </Link>
              </Breadcrumbs>
            );
          }
        })()}
      </div>
    </Container>
  );
}

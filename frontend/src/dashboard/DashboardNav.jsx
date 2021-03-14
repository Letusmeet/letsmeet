// import DashboardIcon from "@material-ui/icons/Dashboard";
// import React from "react";
// import Board from "./board/Board";
import { Container, Row, Col, Nav } from "react-bootstrap";
// import SaveIcon from "@material-ui/icons/Save";
// import axios from "axios";
import Button from "@material-ui/core/Button";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       margin: theme.spacing(1),
//     },
//   })
// );

// function OfficeList() {
//   return (
//     <>
//       <Container>
//         <div className="shadow-sm p-3 mb-5 bg-body rounded">
//           <Row>
//             <Col lg="2">
//               <NavLink
//                 to="/home"
//                 exact
//                 activeClassName="active_nav"
//                 className="nav-link"
//               >
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   startIcon={<HomeIcon />}
//                 >
//                   Home
//                 </Button>
//               </NavLink>
//             </Col>
//           </Row>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default OfficeList;

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

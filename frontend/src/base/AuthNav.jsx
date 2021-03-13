import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import UserAuth from "../accounts/UserAuth";
import TemporaryDrawer from "./SideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AuthNav() {
  const { setAuthenticated } = React.useContext(UserAuth);
  const classes = useStyles();
  const history = useHistory();
  const logoutHandler = () => {
    window.localStorage.setItem("isAuth", false);
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#2e3847" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <TemporaryDrawer />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            OnWork
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Tooltip onClick={logoutHandler} title="LogOut">
              <ExitToAppIcon style={{ color: "red" }} />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AuthNav;

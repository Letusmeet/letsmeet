<<<<<<< HEAD
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import AccessibilityNewSharpIcon from "@material-ui/icons/AccessibilityNewSharp";
import axios from "axios";
import UserAuth from "../accounts/UserAuth";
import { useHistory } from "react-router-dom";

export default function TemporaryDrawer() {
  const { setAuthenticated } = React.useContext(UserAuth);
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false,
  });

  const dashboardHandler = () => {
    history.push("/dashboard");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  //return part
  return (
    <React.Fragment>
      <DehazeIcon onClick={toggleDrawer("left", true)} />
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <div
          style={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <Avatar
            style={{
              left: "50%",
              marginBottom: "3%",
              marginTop: "3%",
            }}
            alt="Remy Sharp"
            src="https://th.bing.com/th/id/OIP.Ew_CwkY6GsOnrWjEy2iRBQHaFj?w=206&h=154&c=7&o=5&dpr=1.25&pid=1.7"
          />
          <Divider />
          <List>
            <ListItem onClick={dashboardHandler} button>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AccessibilityNewSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
=======
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import AccessibilityNewSharpIcon from "@material-ui/icons/AccessibilityNewSharp";
import axios from "axios";
import UserAuth from "../accounts/UserAuth";
import { useHistory } from "react-router-dom";

export default function TemporaryDrawer() {
  const { setAuthenticated } = React.useContext(UserAuth);
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  //return part
  return (
    <React.Fragment>
      <DehazeIcon onClick={toggleDrawer("left", true)} />
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <div
          style={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <Avatar
            style={{
              left: "50%",
              marginBottom: "3%",
              marginTop: "3%",
            }}
            alt="Remy Sharp"
            src="https://th.bing.com/th/id/OIP.Ew_CwkY6GsOnrWjEy2iRBQHaFj?w=206&h=154&c=7&o=5&dpr=1.25&pid=1.7"
          />
          <Divider />
          <List>
            {["Office", "Setting", "Help"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeWorkIcon />
                  ) : index === 1 ? (
                    <SettingsIcon />
                  ) : (
                    <AccessibilityNewSharpIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            {/* <ListItem onClick={LogOut} button>
              <ListItemIcon>
                <ExitToAppSharpIcon style={{ color: "red" }} />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItem> */}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
>>>>>>> c2fa6dafbd2359ad6bc0c5ab7faebfe2f6a65a67

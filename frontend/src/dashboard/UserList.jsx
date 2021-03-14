import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import { Modal } from 'react-bootstrap'
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory , Link} from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 520,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function CheckboxListSecondary(props) {
  const classes = useStyles();
  const history = useHistory();

  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(
        "/fetchofficemembers",
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response);
          setUserList(response.data);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.error("err :" + err);
      });
  }, []);
  const [checked, setChecked] = React.useState([1]);
  const [show, setShow] = useState(false);
  const [userdet, setUserdet] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState('')
  const fetchUsers = (query) => {
    setSearch(query)
    fetch('/searchuser', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem('csrfToken')}`
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(result => {
        setUserdet(result.user)
      })
  }


  const adduser = (userdid) => {
    fetch(`/adduseroffice/${userdid}/${window.localStorage.getItem('officeID')}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem('csrfToken')}`
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result);
      })
  }

  return (
    <>
      <div>
        <Button onClick={handleShow}>
          <AddIcon style={{ color: "#de3e4d", fontWeight: "bold" }} />
        </Button>
      </div>
      <List dense className={classes.root}>
        <ListItem button style={{ textAlign: "center" }}>
          <h5>Office Member</h5>
        </ListItem>
        {userList.map((value) => {
          return (
            
            <ListItem key={value} button>
              <ListItemAvatar>
              </ListItemAvatar>
              <Link to="/chat">
              <ListItemText primary={'Hi'} />
              </Link>
              <ListItemSecondaryAction>
                <ChatBubbleIcon style={{ color: "#de3e4d" }} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Search for user</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => fetchUsers(e.target.value)}

          />
          <ul className="collection">
            {userdet.map(item => {
              return <li className="collection-item" >
                <div>
                  <div>
                    {item.email}
                  </div>
                  <div>
                    <Button onClick={() => adduser(item._id)} >Add</Button>
                  </div>
                </div>
              </li>
            })}

          </ul>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                    </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

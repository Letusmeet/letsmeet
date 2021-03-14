import React from "react";
//import Card from "./Cards";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Wrapper, Item, Content, Card } from "./styles";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, Switch, Route } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import { colors } from "@material-ui/core";
import bg from "./cardbg.jpg";
import Modal from "react-modal";
import "./styles.css";

function CardList(props) {
  const [cardListArray, setCardListArray] = React.useState([]);

  let boardId;
  try {
    boardId = props.location.aboutProps.boardId;
  } catch (error) {
    boardId = window.localStorage.getItem("boardId");
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  let items = [
    {
      title: "Title",
      description:
        "HI, this is the description of the dummy content, we will integrate it soon!",
      comments: [
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
      ],
    },
    {
      title: "Title",
      description:
        "HI, this is the description of the dummy content, we will integrate it soon!",
      comments: [
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
      ],
    },
    {
      title: "Title",
      description:
        "HI, this is the description of the dummy content, we will integrate it soon!",
      comments: [
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
        {
          by: "Nishi",
          body: "This is the dummy comment!",
          date: "2 March",
        },
      ],
    },
  ];

  //get post list
  React.useEffect(() => {
    axios
      .get(`fetchcard/${boardId}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
          window.localStorage.setItem("boardId", boardId);
          console.log(arr);
          setCardListArray(arr);
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
            pathname: "/createcard",
            aboutProps: {
              boardId: boardId,
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

        <Grid>
          {cardListArray.map((node) => (
            <Item key={node.id} rel="noopener noreferrer" background={bg}>
              <Card>
                <Content>
                  <div>
                    <h4>{node.title}</h4>
                  </div>

                  <p>{node.description}</p>
                  <Button onClick={() => setModalIsOpen(true)}>Comments</Button>
                </Content>
              </Card>
            </Item>
          ))}
        </Grid>

        <Modal isOpen={modalIsOpen} className="comments_modal">
          <p>
            <strong className="mt-5 modal_text">This is for Comments!</strong>
          </p>
          <div className="text-center py-5 button_div">
            <div className="close_button">
              <button
                className="modal_button"
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </Container>
    </>
  );
}

export default CardList;

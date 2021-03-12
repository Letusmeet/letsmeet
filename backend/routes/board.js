const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Board = mongoose.model("Board");
const Card = mongoose.model("Card");

//to create a taskboard
router.post("/createboard", (req, res) => {
  const { title, manager, description } = req.body; //requires board title, the userid which is creating as manager
  var myboard = new Board({
    //and some description about board.
    boardtitle: title,
    manager,
    description,
  });
  myboard
    .save()
    .then((board) => {
      res.json({ board, message: "Board created successfully!" });
    })
    .catch((err) => {
      res.json({ err, message: "Some error occured, please try again!" });
    });
});

//to create a card
router.post("/createcard", (req, res) => {
  const { title, board, description } = req.body; //requires card title, the boardId in which it is created
  var mycard = new Card({
    //and some description about card.
    title,
    board,
    description,
    status: "Todo",
  });
  mycard
    .save()
    .then((card) => {
      Board.findByIdAndUpdate(board, { $push: { cards: mycard._id } }).then(
        (added) => {
          res.json({ card, message: "Card created successfully!" });
        }
      );
    })
    .catch((err) => {
      res.json({ err, message: "Some error occured, please try again!" });
    });
});

//to add employees to board
router.post("/addemployee", (req, res) => {
  const { employee, board } = req.body; //needs id of the employee to be added to board and boardId
  console.log(employee);
  Board.findById(board)
    .then((added) => {
      added.updateOne({ $push: { employees: employee } }).then((done) => {
        res.json({ done, message: "Employee added successfully!" });
      });
    })
    .catch((err) => {
      res.json({ err, message: "Some error occurred, please try again!" });
    });
});

//to remove employees from board
router.post("/removeemployee", (req, res) => {
  const { employee, board } = req.body; //needs id of the employee to be removed to board and boardId
  Board.findById(board)
    .then((removed) => {
      removed.updateOne({ $pull: { employees: employee } }).then((done) => {
        res.json({ done, message: "Employee removed successfully!" });
      });
    })
    .catch((err) => {
      res.json({ err, message: "Some error occurred, please try again!" });
    });
});

//to add comment on card
router.post("/comment", (req, res) => {
  const { card, user, comment } = req.body; //needs cardId on which commented, userId,comment body
  Card.findById(card)
    .then((mycard) => {
      var mycomment = {
        by: user,
        body: comment,
      };
      mycard.update({ $push: { comments: mycomment } }).then((done) => {
        res.json({ done, message: "Comment added!" });
      });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Some error occured in adding comment, please try again!",
      });
    });
});

//to change status of card
router.post("/changestatus", (req, res) => {
  const { card, status } = req.body; //needs cardId whose status to be changed and the status
  Card.findById(card)
    .then((mycard) => {
      mycard.update({ status: status }).then((done) => {
        res.json({ done, message: "Status Changed!" });
      });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Some error occured while changing status, please try again!",
      });
    });
});

//to delete the board
router.post("/deleteboard", (req, res) => {
  const { board } = req.body; //needs baord id to be deleted
  Board.findById(board)
    .then((found) => {
      found.cards.forEach((item) => {
        Card.findByIdAndRemove(item._id)
          .then((card) => {
            console.log(card);
          })
          .catch((err) => {
            res.json({ err, message: "Some error occured" });
          });
      });
      found.remove().then((done) => {
        res.json({ done, message: "Board deleted successfully!" });
      });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Some error occured while deleting board, please try again!",
      });
    });
});

//to delete card
router.post("/deletecard", (req, res) => {
  const { card } = req.body; //needs cardId that is to be deleted
  Card.findById(card)
    .then((mycard) => {
      Board.findById(card.board).then((board) => {
        board.update({ $pull: { cards: card } }).then((removed) => {
          console.log(removed);
          mycard.deleteOne().then((deleted) => {
            res.json({ deleted, message: "Card deleted successfully!" });
          });
        });
      });
    })
    .catch((err) => {
      res.json({
        err,
        message: "Some error occured while deleting card, please try again!",
      });
    });
});

module.exports = router;

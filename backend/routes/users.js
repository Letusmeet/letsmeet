const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Board = mongoose.model("Board");
const Card = mongoose.model("Card");
const Room = mongoose.model("Room");
const Office = mongoose.model("Office");
const middlewareadmin = require("../middleware/admin");
const middleware = require("../middleware/user");

//to send request to any user
router.post("/sendrequest/:id", middleware, (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $addToSet: { requests: req.user._id },
  })
    .then((friend) => {
      req.user
        .updateOne({ $addToSet: { sent: req.params.id } })
        .then((sent) => {
          console.log(friend, sent);
          res.status(200).json("Request sent succesfully");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Some error occured");
    });
});

//to accept a friend request
router.post("/acceptrequest/:id", middleware, (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { sent: req.user._id } })
    .then((friend) => {
      req.user
        .updateOne({
          $addToSet: { friends: req.params.id },
          $pull: { requests: req.params.id },
        })
        .then((added) => {
          console.log(friend, added);
          res.status(200).json("Request accepted succesfully");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Some error occured");
    });
});

//to deny a friend request
router.post("/denyrequest/:id", middleware, (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { sent: req.user._id } })
    .then((friend) => {
      req.user
        .updateOne({ $pull: { requests: req.params.id } })
        .then((denied) => {
          console.log(friend, denied);
          res.status(200).json("Request rejected succesfully");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Some error occured");
    });
});

//to fetch all requests
router.post("/myrequests", middleware, (req, res) => {
  User.findById(req.user._id)
    .then((me) => {
      res.status(200).json(me.requests);
    })
    .catch((err) => {
      res.status(500).json("Some error occured, please try again!");
    });
});

//to fetch the rooms he is in
router.post("/fetchroom", middleware, (req, res) => {
  res.json(req.user.rooms);
});

//to fetch userprofile
router.post("/profile", middleware, (req, res) => {
  User.findById(req.user._id)
    .then((me) => {
      res.status(200).json(me);
    })
    .catch((err) => {
      res.status(500).json("Some error occured, please try again!");
    });
});

//to fetch office member
router.post("/fetchofficemembers", middleware, (req, res) => {
  Office.findById(req.user.office).then((result) => {
    res.json(result.membersoffice);
  });
});

//to fetch board from room id
router.get("/fetchboard/:id", middleware, (req, res) => {
  Room.findById(req.params.id)
    .populate("boards")
    .then((result) => {
      res.json(result.boards);
    })
    .catch((err) => {
      res.json("server error");
    });
});

//to room from officeid
router.get("/fetchroom/:id", middleware, (req, res) => {
  Office.findById(req.params.id)
    .populate("rooms")
    .then((result) => {
      res.json(result.rooms);
    })
    .catch((err) => {
      res.json("server error");
    });
});

//to fetch card from boardid
router.get("/fetchcard/:id", middleware, (req, res) => {
  Board.findById(req.params.id)
    .populate("cards")
    .then((result) => {
      res.json(result.cards);
    })
    .catch((err) => {
      res.json("server error");
    });
});

module.exports = router;

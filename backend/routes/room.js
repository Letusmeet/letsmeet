const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Board = mongoose.model("Board");
const Card = mongoose.model("Card");
const Room = mongoose.model("Room");
const Convo = mongoose.model("conversations");
const Office = mongoose.model("Office");
const middlewareadmin = require("../middleware/admin");
const middleware = require("../middleware/user");

//to create office
router.post("/createoffice", middleware, (req, res) => {
  const { officename } = req.body;
  if (!officename) {
    return res.json("please give the office name");
  }
  try {
    var office = new Office({
      name: officename,
      admin: req.user._id,
      membersoffice: { memberid: req.user._id },
    });
    office.save().then((result) => {
      console.log(result._id);
      User.findByIdAndUpdate(
        req.user._id,
        {
          $set: { admin: true, office: result._id },
        },
        { new: true }
      )
        .then(() => {
          res.json(result._id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

//to create rooms
router.post("/createroom/:officeid", middlewareadmin, (req, res) => {
  const { roomname, description } = req.body;
  if (!roomname) {
    return res.json("please give the room name");
  }
  const room = new Room({
    name: roomname,
    admin: req.user._id,
    description,
  });
  room
    .save()
    .then((result) => {
      Office.findByIdAndUpdate(
        req.params.officeid,
        {
          $push: { rooms: result._id },
        },
        { new: true }
      )
        .then(() => {
          res.json("Room created succesfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//make manager id is userid
router.post("/makemanger/:id/:roomid", middlewareadmin, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { managerof: req.params.roomid },
      $set: { manager: true },
    },
    { new: true }
  )
    .then(() => {
      Room.findByIdAndUpdate(
        req.params.roomid,
        {
          $push: { manager: req.params.id },
        },
        { new: true }
      )
        .then(() => {
          res.json("manager created");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//add user to room
router.post("/adduser/:id/:roomid", middlewareadmin, (req, res) => {
  Room.findByIdAndUpdate(
    req.params.roomid,
    {
      $push: { members: req.params.id },
    },
    { new: true }
  )
    .then(() => {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $push: { rooms: req.params.roomid },
        },
        { new: true }
      )
        .then(() => {
          res.json("Added to room Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//search user for adding in office
router.post("/searchuser", middlewareadmin, (req, res) => {
  let userpattern = new RegExp("^" + req.body.query);
  User.find({ email: { $regex: userpattern } })
    .select("_id email")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

//add user to office
router.post("/adduseroffice/:id/:officeid", middlewareadmin, (req, res) => {
  Office.findByIdAndUpdate(
    req.params.officeid,
    {
      $push: { membersoffice: { memberid: req.params.id } },
    },
    { new: true }
  )
    .then(() => {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $push: { office: req.params.officeid },
        },
        { new: true }
      )
        .then(() => {
          res.json("Added to office Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//add user to office
router.post("/adduseroffice/:id/:officeid", middlewareadmin, (req, res) => {
  Office.findByIdAndUpdate(
    req.params.Officeid,
    {
      $push: { membersoffice: { memberid: req.params.id } },
    },
    { new: true }
  )
    .then(() => {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $push: { office: req.params.office },
        },
        { new: true }
      )
        .then(() => {
          res.json("Added to office Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//to create general chat from officeid
router.post("/gc/:id", middlewareadmin, (req, res) => {
  try {
    const newconvo = Convo({
      recipients: req.user._id,
      name: "General",
    });
    newconvo.save().then((result) => {
      Office.findByIdAndUpdate(
        req.params.id,
        {
          $set: { generalchat: result._id },
        },
        { new: true }
      )
        .then(() => {
          res
            .status(200)
            .json({ message: "Conversation created successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Server error" });
        });
    });
  } catch {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const middleware = require('../middleware/user')
const middlewareadmin = require('../middleware/admin')
const Message = require("../models/Message");
const Office = require("../models/office");
const Conversation = require("../models/Conversation");
const User = require("../models/user");
//const { default: UserProfile } = require("../../frontend/src/Chat/UserProfile/UserProfile");

/*
Todo: jwtCheck for all routes, Socket connection (Refer this repo: https://github.com/davehowson/chat-app)
 */
//Send a private message to someone
/*
Request body example: 
{
    "to":"604b37b19cde5d50c3e58c63",
    "body":"How are you"
}
}*/
router.post("/chat", middleware, (req, res) => {
  let from = req.user._id;
  let to = req.body.to.toString();
  console.log(from, to, "chat route");
  // Conversation.findOneAndUpdate(
  //   {
  //     // recipients: {
  //     //   $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
  //     // },
  //     privatechat:{
  //       to:to.toString(),
  //       from:from.toString()
  //     }
  //   },
  //   {
  //     //recipients: [req.user._id, req.body.to],
  //     privatechat:{
  //       to:to,
  //       from:from
  //     },
  //     lastMessage: req.body.body,
  //     date: Date.now(),
  //   },
  //   {upsert:true, new:true, setDefaultsOnInsert: true }).then((conversation)=>{

  //       console.log(conversation);


  //   }).catch(err=>{
  //       console.log(err);
  //       res.setHeader("Content-Type", "application/json");
  //       res.end(JSON.stringify({ message: "Failure" }));
  //       res.sendStatus(500);

  //   })

  Conversation.find().then(found => {
    var ob = found.filter(item => {
      if (item.privatechat.to == to.toString() && item.privatechat.from == from.toString()) {
        return item;
      }
      console.log(item.privatechat);
    });
    console.log(ob);
    if (ob.length == 0) {
      myconvo = new Conversation({
        privatechat: {
          to: to,
          from: from
        },
        lastMessage: req.body.body
      });
      myconvo.save().then(done => {
        console.log(done);
        let message = new Message({
          conversation: done._id,
          to: req.body.to,
          from: req.user._id,
          body: req.body.body,
        });
      
        //socket connection https://github.com/davehowson/chat-app
        req.io.sockets.emit("messages", req.body.body);
        message.save().then(done => {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Success",
              conversationId: conversation._id,
            })
          );
        }).catch(err => {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Failure" }));
          res.sendStatus(500);
        })
      })
    }
    else {
      Conversation.findByIdAndUpdate(ob[0]._id, {
        lastMessage: req.body.body
      }).then(changed => {
        res.json(changed)
        let message = new Message({
          conversation: conversation._id,
          to: req.body.to,
          from: req.user._id,
          body: req.body.body,
        });
      
        //socket connection https://github.com/davehowson/chat-app
        req.io.sockets.emit("messages", req.body.body);
        message.save().then(done => {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Success",
              conversationId: changed._id,
            })
          );
        }).catch(err => {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Failure" }));
          res.sendStatus(500);
        })
      }).catch(err => {
        console.log(err);
      })
    }
  });

  
});

//to fetch all the conversations the person had
router.get("/conversations", middleware, async (req, res) => {
  try {
    let userId = req.user._id; //should add logged in user id
    //console.log(userId);
    let result = await Conversation.find().then(convos=>{
      //console.log(convos);
      var ob=convos.filter(item=>{
        //console.log(item.privatechat.to);
        if(item.privatechat.to==userId.toString()||item.privatechat.from==userId.toString()){
          return item;
        }
      });
      console.log(ob);
      res.status(200).json(ob);
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

//to get all messages of a particular conversation
//param id should be id of the conversation in db
router.get("/messages/:id", middleware, async (req, res) => {
  try {
    let conversationId = req.params.id;
    const messages = await Message.find({ conversation: conversationId }).then(done=>{
      console.log(done);
    });
    res.status(200).json(messages);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

//to create a new conversation between two people
/*
  Request body example:
  {
    first: 604b75952cf2954a247001e0
    second: 604b75952cf2954a247001e1
  }
*/
router.post("/new", middleware, async (req, res) => {
  try {
    const first = req.user._id;
    const { second } = req.body;
    if (first === second) {
      res.status(409).json({ message: "Invalid body, each id should be unique" });
    }
    else {
      const exist = await Conversation.find({ $and: [{ recipients: first }, { recipients: second }] })
      if (exist.length > 0) {
        res.status(409).json({ message: "Conversation already exists" });
      }
      else {
        let recipients = [];
        recipients.push(first);
        recipients.push(second);
        const newConversation = await Conversation.create({ recipients: recipients });
        console.log(newConversation)
        res.status(200).json({ message: "Conversation created successfully" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
})


router.post('/addusertochat/:chatid/:id', middlewareadmin, (req, res) => {
  Conversation.findByIdAndUpdate(req.params.chatid, {
    $push: { recipients: req.params.id }
  }, { new: true }).then(() => {
    res.status(200).json({ message: "Conversation created successfully" });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  })
})



//to fetch chat for general
router.post('/grenralchat/:officeid', middleware, (req, res) => {
  Office.findById(req.params.officeid)
    .populate("generalchat")
    .then(response => {
      res.json(response.generalchat)
    })
})


module.exports = router;

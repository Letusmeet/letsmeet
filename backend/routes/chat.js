const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

/*
Todo: jwtCheck for all routes, Socket connection
 */

//Send a private message to someone
/*
Request body example: 
{
    "from":"604b356433ba894e0a52ca21",
    "to":"604b37b19cde5d50c3e58c63",
    "body":"How are you"
}
}*/
router.post("/chat", (req, res) => {
  let from = mongoose.Types.ObjectId(req.body.from);
  let to = mongoose.Types.ObjectId(req.body.to);

  Conversation.findOneAndUpdate(
    {
      recipients: {
        $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
      },
    },
    {
      recipients: [req.body.from, req.body.to],
      lastMessage: req.body.body,
      date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function (err, conversation) {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        let message = new Message({
          conversation: conversation._id,
          to: req.body.to,
          from: req.body.from,
          body: req.body.body,
        });

        //req.io.sockets.emit("messages", req.body.body);

        message.save((err) => {
          if (err) {
            console.log(err);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Failure" }));
            res.sendStatus(500);
          } else {
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                message: "Success",
                conversationId: conversation._id,
              })
            );
          }
        });
      }
    }
  );
});

//to fetch all the conversations the person had
router.get("/conversations", async (req, res) => {
  try {
    let userId = "604b356433ba894e0a52ca21"; //should add logged in user id
    let result = await Conversation.find({ recipients: userId });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

//to get all messages of a particular conversation
//param id should be id of the conversation in db
router.get("/messages/:id", async (req, res) => {
  try {
    let conversationId = req.params.id;
    const messages = await Message.find({ conversation: conversationId });
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
router.post("/new", async (req, res) => {
  try{
    const {first, second} = req.body;
    if(first === second){
      res.status(409).json({message:"Invalid body, each id should be unique"});
    }
    else{
      const exist = await Conversation.find({ $and: [ { recipients: first }, { recipients: second } ] })
      if(exist.length > 0){
        res.status(409).json({ message :"Conversation already exists"});
      }
      else{
        let recipients=[];
        recipients.push(first);
        recipients.push(second);
        const newConversation= await Conversation.create({recipients: recipients});
        console.log(newConversation)
        res.status(200).json({message:"Conversation created successfully"});
      }
    }
  }catch (e) {
    console.log(e);
    res.status(500).json({message :"Server error"});
  }
})

module.exports = router;

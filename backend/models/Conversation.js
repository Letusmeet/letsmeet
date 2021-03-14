const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  name: {
    type: String
  },
  recipients: [{ type: Schema.Types.ObjectId, ref: "User" }],
  lastMessage: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
  privatechat:{
    from:{
      type: Schema.Types.ObjectId, ref:"User"
    },
    to:{
      type: Schema.Types.ObjectId, ref:"User"
    }
  }
});

module.exports = Conversation = mongoose.model(
  "conversations",
  ConversationSchema
);

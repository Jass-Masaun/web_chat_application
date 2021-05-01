const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recieversData: [
    {
      reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      messages: [
        {
          message: String,
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          // meta: [
          //   {
          //     user: {
          //       type: mongoose.Schema.Types.ObjectId,
          //       ref: "User",
          //     },
          //     // delivered: Boolean,
          //     // read: Boolean,
          //   },
          // ],
        },
      ],
    },
  ],
  is_group_message: { type: Boolean, default: false },
  participants: [],
});

module.exports = mongoose.model("Chat", chatSchema);

const express = require("express");
const ObjectID = require("mongodb").ObjectID;
const router = express.Router();
const auth = require("../../middleware/auth");
const asyncHandler = require("../../error/asyncHandler");
const { success, failed } = require("../../utils/httpHandler");

const Chat = require("../../Models/Chat");

router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const reciever = req.params.id;
    if (!ObjectID.isValid(userId)) {
      return failed(res, 404, "User not found");
    }
    const chat = await Chat.findOne({ user: userId });

    if (chat) {
      chat.recieversData.forEach((requiredReciever) => {
        if (reciever == requiredReciever.reciever) {
          return success(res, requiredReciever);
        }
      });

      return;
    } else {
      return success(res, null);
    }
  })
);

router.route("/").post(
  auth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { message, sender, reciever } = req.body;
    if (!ObjectID.isValid(reciever)) {
      return failed(res, 404, "User not found");
    }
    let chat = await Chat.findOne({ user: userId });
    let messages = [];
    if (chat) {
      const alreadyChatWithReciever = chat.recieversData.find(
        (recieverData) => {
          return recieverData.reciever == reciever;
        }
      );
      if (alreadyChatWithReciever) {
        messages.push({ message, sender });
        chat.recieversData.forEach((requiredReciever) => {
          if (reciever == requiredReciever.reciever) {
            requiredReciever.messages.push({ message, sender });
          }
        });

        await chat.save();
        chat.recieversData.forEach((requiredReciever) => {
          if (reciever == requiredReciever.reciever) {
            return success(res, requiredReciever);
          }
        });

        return;
      }

      return;
    } else {
      chat = new Chat({
        user: userId,
      });
      messages.push({ message, sender });
      chat.recieversData.push({ reciever, messages });
      await chat.save();
      chat.recieversData.forEach((requiredReciever) => {
        if (reciever == requiredReciever.reciever) {
          return success(res, requiredReciever);
        }
      });
      return;
    }
  })
);

module.exports = router;

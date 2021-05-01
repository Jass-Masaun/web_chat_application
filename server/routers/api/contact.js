const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const asyncHandler = require("../../error/asyncHandler");
const Contact = require("../../Models/Contact");
const User = require("../../Models/User");
const { success, failed } = require("../../utils/httpHandler");

router
  .route("/")
  .get(
    auth,
    asyncHandler(async (req, res) => {
      const userContacts = await Contact.findOne({
        user: req.user.id,
      });
      if (userContacts !== null) {
        return success(res, userContacts.contacts);
      } else {
        return failed(res, 404, "No contact found");
      }
    })
  )
  .post(
    auth,
    asyncHandler(async (req, res) => {
      const email = req.body.email;
      const name = req.body.name;
      const user = await User.findOne({ email });
      if (user) {
        let contactData = {
          _id: user._id,
          email,
          name,
        };
        let contact;
        contact = await Contact.findOne({ user: req.user.id });
        if (contact) {
          if (req.user.id == user._id)
            return failed(res, 400, "You can't add yourself");
          let match;
          contact.contacts.forEach(async (cont) => {
            match = cont.email === email;
          });
          if (match) {
            return failed(res, 409, "Contact already exists");
          } else {
            contact.contacts.push(contactData);
          }
        } else {
          if (req.user.id == user._id)
            return failed(res, 400, "You can't add yourself");
          contact = new Contact({
            user: req.user.id,
          });
          contact.contacts.push(contactData);
        }
        await contact.save();
        return success(res, contact.contacts);
      } else {
        return failed(res, 404, "User not exist with this email");
      }
    })
  );

module.exports = router;

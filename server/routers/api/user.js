const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../Models/User");
const { success, failed } = require("../../utils/httpHandler");

// Error handler: asyncHandler
const asyncHandler = require("../../error/asyncHandler");

const router = express.Router();

router.route("/").post(
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_KEY, (err, token) => {
      if (err) {
        failed(res, 500, "Server error");
        console.log(err);
      } else {
        success(res, token);
      }
    });
  })
);

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Database models
const User = require("../../Models/User");

// Error handler: asyncHandler
const asyncHandler = require("../../error/asyncHandler");

// http Response
const { success, failed } = require("../../utils/httpHandler");

// middleware
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(
    auth,
    asyncHandler(async (req, res) => {
      const user = await User.findById(req.user.id).select("-password");
      success(res, user);
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return failed(res, 401, "User or password not match");
      }
      if (user.password !== password) {
        return failed(res, 401, "User or password not match");
      } else {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, process.env.JWT_KEY, (err, token) => {
          if (err) {
            failed(res, 500, "Server Error");
          } else {
            success(res, token);
          }
        });
      }
    })
  );

module.exports = router;

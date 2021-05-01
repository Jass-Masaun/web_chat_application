const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "not authorized, token not found", data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized access" });
  }
};

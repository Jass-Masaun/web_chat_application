const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const connectDB = require("./config/db");
const socketConnection = require("./socket");
require("dotenv").config();
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/user", require("./routers/api/user"));
app.use("/api/auth", require("./routers/api/auth"));
app.use("/api/contact", require("./routers/api/contact"));
app.use("/api/chat", require("./routers/api/chat"));

socketConnection(httpServer);
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Successfully connected to server at port ${PORT}`);
});

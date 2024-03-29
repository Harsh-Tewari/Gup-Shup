const express = require("express");
const connectdb = require("./config/connectDB");
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

connectdb();

app.use(express.json()); // app ko bataya ki frontend se json data accept kar lo

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

//to get single chat
app.get("/api/chat/:id", (req, res) => {
  let singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
  res.send(chats);
});

//Authentication API
app.use("/api/user", userRoutes);

//Error Handling Middleware endpoints
app.use(notFound);
app.use(errorHandler);

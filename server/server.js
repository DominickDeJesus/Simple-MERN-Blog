const express = require("express");
const articleRouter = require("./article/router");
const mongoose = require("mongoose");
const server = express();
const PORT = process.env.port || 4000;
require("dotenv").config();

server.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}`)
);

// connect to the database
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// open the connection
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established."));

// to format requests into JSON
server.use(express.json());
// to correctly get the information from submissions
server.use(express.urlencoded({ extended: false }));

server.use("/articles", articleRouter);

require("dotenv").config();
require("./db/connection");
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const {log} = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors

const UserRouter = require("./controllers/User");
const TodoRouter = require("./controllers/Todo");

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env;

// Create Application Object
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working");
})
app.use("/user", UserRouter);
app.use("/todo", TodoRouter);

// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
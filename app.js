const express = require("express");
const path = require("path");

 //const testRouter = require("../routers/test.router");
const togeminiRouter = require("./routers/togemini.router");
const cors = require("cors");
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());


app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

// app.use("/api/test", testRouter);
app.use("/api/togemini", togeminiRouter);
app.listen(PORT, () => console.log("Server running on " + PORT));

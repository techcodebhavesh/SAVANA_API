const express = require("express");
const {
  processEntriesHandler2,
  // retrieveApiKey
} = require("../controllers/togroq.controller");
const togroqRouter = express.Router();

togroqRouter.post("/process1", processEntriesHandler2);

//apikeyRouter.get("/retrive", retrieveApiKey);

module.exports = togroqRouter;

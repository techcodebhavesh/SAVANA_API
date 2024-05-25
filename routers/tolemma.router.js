const express = require("express");
const {
  processEntriesHandler1,
  // retrieveApiKey
} = require("../controllers/lamma.controller");
const tolammaRouter = express.Router();

tolammaRouter.post("/process", processEntriesHandler1);

//apikeyRouter.get("/retrive", retrieveApiKey);

module.exports = tolammaRouter;

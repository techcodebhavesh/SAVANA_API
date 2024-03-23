const express = require("express");
const {
  processEntriesHandler,
  // retrieveApiKey
} = require("../controllers/togemini.controller");
const togeminiRouter = express.Router();

togeminiRouter.post("/process", processEntriesHandler);

//apikeyRouter.get("/retrive", retrieveApiKey);

module.exports = togeminiRouter;

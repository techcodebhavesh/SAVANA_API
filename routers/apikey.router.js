const express = require("express");
const {
    generateApiKey,
  // retrieveApiKey
} = require("../controllers/apigen.controller");
const apikeyRouter = express.Router();

apikeyRouter.post("/generate", generateApiKey);

//apikeyRouter.get("/retrive", retrieveApiKey);

module.exports = apikeyRouter;

const express = require('express');
const multer = require('multer');
const path = require('path');
const { processWordHandler,deleteWordHandler } = require('../controllers/savef.controller.js');

const savefRouter = express.Router();

const upload1 = multer({
    dest: path.join(__dirname, '../uploads11') // Directory where uploaded files will be stored temporarily
});


    





savefRouter.post('/word', upload1.single('file'), processWordHandler);
savefRouter.delete('/deleteword', deleteWordHandler);

module.exports = savefRouter;

        const express = require('express');
        const multer = require('multer');
        const path = require('path');
        const { processVideoHandler, deleteVideoHandler } = require('../controllers/savev.controller.js');

        const savevRouter = express.Router();

        const upload = multer({
            dest: path.join(__dirname, '../uploads') // Directory where uploaded files will be stored temporarily
        });
       

            

        savevRouter.post('/save', upload.single('video'), processVideoHandler);
        savevRouter.delete('/delete', deleteVideoHandler); // New delete route



        module.exports = savevRouter;

        const express = require('express');
        const multer = require('multer');
        const path = require('path');
        const { processVideoHandler, deleteVideoHandler,processImageHandler,deleteImageHandler } = require('../controllers/savev.controller.js');

        const savevRouter = express.Router();

        const upload = multer({
            dest: path.join(__dirname, '../uploads') // Directory where uploaded files will be stored temporarily
        });

        const upload2 = multer({
            dest: path.join(__dirname, '../uploads22') // Directory where uploaded files will be stored temporarily
        });
       
       

            

        savevRouter.post('/save', upload.single('video'), processVideoHandler);
        savevRouter.delete('/delete', deleteVideoHandler); // New delete route

        savevRouter.post('/img', upload2.single('image'),  processImageHandler); // New save route
        savevRouter.delete('/deleteimg',deleteImageHandler); // New delete route



        module.exports = savevRouter;

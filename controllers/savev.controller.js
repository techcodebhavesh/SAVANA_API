const fs = require('fs');
const path = require('path');

const outputDirectory = 'D:/SAVANA_API/AI/setup/deepfake/video';
const newFileName = 'testv.mp4';

const imageOutputDirectory = 'D:/SAVANA_API/AI/setup/deepfake/images';
const newImageFileName = 'img.png';



const processVideoFile = (inputFile) => {
    if (fs.existsSync(inputFile)) {
        try {
            if (!fs.existsSync(outputDirectory)) {
                fs.mkdirSync(outputDirectory, { recursive: true });
            }

            const newFilePath = path.join(outputDirectory, newFileName);
            fs.renameSync(inputFile, newFilePath);
            return 'Video file renamed and moved successfully!';
        } catch (error) {
            return `An error occurred: ${error.message}`;
        }
    } else {
        return 'Input file does not exist.';
    }
};

const processVideoHandler = async (req, res) => {
    try {
        const inputFile = req.file.path; // Get the uploaded file path from multer

        const status = processVideoFile(inputFile);
        res.send(JSON.stringify({ message: status }));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteVideoHandler = (req, res) => {
    try {
        const filePath = path.join(outputDirectory, newFileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.send({ message: 'Video file deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Video file does not exist.' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};



// const processPythonCodeHandler = (req, res) => {
//     // Command to execute the Python script
//     const pythonCommand = 'python your_script.py'; // Replace 'your_script.py' with the actual filename

//     // Execute the Python script
//     exec(pythonCommand, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error.message}`);
//             res.status(500).send(`Error executing Python script: ${error.message}`);
//             return;
//         }
//         if (stderr) {   
//             console.error(`Python script returned an error: ${stderr}`);
//             res.status(500).send(`Python script returned an error: ${stderr}`);
//             return;
//         }
        
//         // Process the output from the Python script if needed
//         console.log(`Python script output: ${stdout}`);
        
//         // Send a success response
//         res.send({ message: 'Python code executed successfully' });
//     });
// };

const processImageFile = (inputFile) => {
    if (fs.existsSync(inputFile)) {
        try {
            if (!fs.existsSync(imageOutputDirectory)) {
                fs.mkdirSync(imageOutputDirectory, { recursive: true });
            }

            const newFilePath = path.join(imageOutputDirectory, newImageFileName);
            fs.renameSync(inputFile, newFilePath);
            return 'Image file renamed and moved successfully!';
        } catch (error) {
            return `An error occurred: ${error.message}`;
        }
    } else {
        return 'Input image file does not exist.';
    }
};

const processImageHandler = async (req, res) => {
    try {
        const inputFile = req.file.path; // Get the uploaded file path from multer

        const status = processImageFile(inputFile);
        res.send(JSON.stringify({ message: status }));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteImageHandler = (req, res) => {
    try {
        const filePath = path.join(imageOutputDirectory, newImageFileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.send({ message: 'Image file deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Image file does not exist.' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    processVideoHandler,
    deleteVideoHandler,
    processImageHandler,
    deleteImageHandler,
};

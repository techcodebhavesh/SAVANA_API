const fs = require('fs');
const path = require('path');



const outputDirectory1 = 'D:/SAVANA_API/AI/setup/deepfake/wordfile'; // Define your output directory
const newFileName1 = 'test.docx'; // Define your new file name


const processWordFile = (inputFile) => {
    if (fs.existsSync(inputFile)) {
        try {
            if (!fs.existsSync(outputDirectory1)) {
                fs.mkdirSync(outputDirectory1, { recursive: true });
            }

            const newFilePath = path.join(outputDirectory1, newFileName1);
            fs.renameSync(inputFile, newFilePath);
            return 'Word file renamed and moved successfully!';
        } catch (error) {
            return `An error occurred: ${error.message}`;
        }
    } else {
        return 'Input file does not exist.';
    }
};

const processWordHandler = async (req, res) => {
   
    try {
        console.log(req.file);
        const inputFile = req.file.path; // Get the uploaded file path from multer
        console.log(`Received file pathd: ${inputFile}`);

        const status = processWordFile(inputFile);
        res.send(JSON.stringify({ message: status }));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteWordHandler = (req, res) => {
    try {
        const filePath = path.join(outputDirectory1, newFileName1);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.send({ message: 'Word file deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Word file does not exist.' });
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


module.exports = {
  
    processWordHandler,
    deleteWordHandler
    
};

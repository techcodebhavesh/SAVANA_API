

const { run } = require("./gemini_trials.controller.js");



const processEntriesHandler = async (req, res) => {
  try{
    const { text } = req.body; // Assuming the text input is in the "text" field of the request body
    console.log(text);
    const textResult=await run(text); // Pass the text input to the run function
     console.log(textResult);
    res.send(textResult);

  }
  catch (err) {
    res.status(500).send(err.message);}
  
  
};

  // Return the validated data
  

module.exports = {
  processEntriesHandler,
  // retrieveApiKey
};

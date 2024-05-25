const { run } = require("./lamma_trials.controller.js");

const processEntriesHandler1 = async (req, res) => {
  try {
    const { text } = req.body; // Assuming the text input is in the "text" field of the request body
    console.log(text);

    // Add the prefix to the text
    const prefixedText = `is this text ai generated: ${text}`;

    // Pass the prefixed text to the run function
    const textResult = await run(prefixedText);
    console.log(textResult);

    // Send the result as a JSON response
    res.send(JSON.stringify(textResult));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  processEntriesHandler1,
};

const Groq = require('groq');

const api = new Groq({
  apiKey: '#|#'
});

const csvFile = 'D:/SAVANA_API/Training_Essay_Data.csv'; // replace with your CSV file path

api.uploadFile(csvFile)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

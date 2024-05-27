const { runQuery } = require('../connection.sql.js');

 

const sendLinetime = async (req, res) => {
    try {
      const { email} = req.body; 
      const result = await runQuery(`SELECT time FROM  graphs WHERE username = ? `, [email]);
      const timesArray = result.map(row => row.time);
  
      res.status(200).json(timesArray);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  };

  module.exports = {
   
    sendLinetime,
   
  };
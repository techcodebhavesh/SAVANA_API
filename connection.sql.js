const mysql = require("mysql");
require("dotenv").config({ path: "./.env" });

const host = process.env.MYSQL_HOST_NAME;
const port = process.env.MYSQL_PORT; // Define the port from your environment variables
const user = process.env.MYSQL_USER_NAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DB_NAME;

const dbConfig = {
  host,
  user,
  password,
  port,
  database,
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Function to handle fatal errors
const handleFatalError = (err) => {
  console.error('Fatal error: ', err.message);
  process.exit(1);
};

// Handle uncaught exceptions
process.on('uncaughtException', handleFatalError);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection: ', err.message);
});

// Function to execute queries
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      // Execute the query
      connection.query(query, params, (queryErr, results) => {
        // Release the connection back to the pool
        connection.release();

        if (queryErr) {
          return reject(queryErr);
        }

        resolve(results);
      });
    });
  });
};

// Close the MySQL pool on process exit
process.on('exit', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing the MySQL pool: ', err.message);
    }
  });
});

module.exports = {
  runQuery,
};
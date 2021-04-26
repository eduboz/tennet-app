const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create  connexion à la bdd
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Ouvrir connexion MYSQL
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

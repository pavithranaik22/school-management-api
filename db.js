const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Pavithra@123",
  database: process.env.DB_NAME || "schooldb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed, running without DB");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
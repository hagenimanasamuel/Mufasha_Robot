const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1253',
  database: 'mufasha_robot_db'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Initialize the database by creating necessary tables
  initializeDatabase();
});

function initializeDatabase() {
  // SQL query to create the users table if it doesn't exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      google_id VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255),
      name VARCHAR(255),
      profile_picture VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // SQL query to create the user_history table if it doesn't exist
  const createUserHistoryTable = `
    CREATE TABLE IF NOT EXISTS user_history (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      interaction TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  // SQL query to create the user_preferences table if it doesn't exist
  const createUserPreferencesTable = `
    CREATE TABLE IF NOT EXISTS user_preferences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      preference_key VARCHAR(255),
      preference_value TEXT,
      UNIQUE(user_id, preference_key),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  // Execute the query to create the users table
  db.query(createUsersTable, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('users table is ready or already exists.');
  });

  // Execute the query to create the user_history table
  db.query(createUserHistoryTable, (err, result) => {
    if (err) {
      console.error('Error creating user_history table:', err);
      return;
    }
    console.log('user_history table is ready or already exists.');
  });

  // Execute the query to create the user_preferences table
  db.query(createUserPreferencesTable, (err, result) => {
    if (err) {
      console.error('Error creating user_preferences table:', err);
      return;
    }
    console.log('user_preferences table is ready or already exists.');
  });
}

module.exports = db;

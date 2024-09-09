// Load environment variables from the .env file at the beginning
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// Import the sequelize instance from your models setup
const { sequelize } = require('./models'); // Adjust the path if necessary

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Authenticate MySQL connection using Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL database established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
    
// Sync all models (creates the tables if they don't exist)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  });

// Example route
app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});
  
// Additional routes can be added here
module.exports = app; // Export the Express app

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

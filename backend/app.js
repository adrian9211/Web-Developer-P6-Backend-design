// Main app.js file to run all application
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces');        // Import router stuff in the app
const userRoutes = require('./routes/user');          // Import router user in the app
const app = express();
const path = require('path');

mongoose.connect('mongodb+srv://adrianUser:r9JeDYNU5kK32aAfKjrm8h910y@cluster0.8txni.mongodb.net/database?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas! ');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 

cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));       // tell how to serve static images, tell folder

app.use('/api/sauces', saucesRoutes);       // Register router stuff in the app
app.use('/api/auth', userRoutes);         // Register router user  in the app
module.exports = app;
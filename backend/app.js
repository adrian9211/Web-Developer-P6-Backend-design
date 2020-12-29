// Main app.js file to run all application
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');        // Import router stuff in the app
const userRoutes = require('./routes/user');          // Import router user in the app
const app = express();
const path = require('path');

mongoose.connect('mongodb+srv://adrianUser:r9JeDYNU5kK32aAfKjrm8h910y@cluster0.8txni.mongodb.net/database?retryWrites=true&w=majority', // Database connection
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error)=>{
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

mongoose.set('useCreateIndex', true)                    // Remove DeprecationWarning after starting the server and connecting to Atlas

app.use(bodyParser.json());

app.use((req, res, next) => {                          //Cross Origin Resource Sharing 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces', sauceRoutes);

module.exports = app;
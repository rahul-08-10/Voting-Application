const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const router = require('./routes/routes');
const database = require('./database/database');

// Middleware to handle form data and JSON
app.use(express.urlencoded({ extended: true }));

// this is the middleware used to extracts the body argument and for the query paramter express undertsand by-default
app.use(express.json());

// Routing for APIs
app.use('/api', router);

// Default route for the homepage
app.get('/', (req, res) => {
    res.send('<h1>THIS IS THE VOTING APPLICATION</h1>');  
});

// Start server and listen on the defined port
app.listen(port, () => {
    console.log(`The server is running at port ${port}`);
});

// Connecting to the database
database();

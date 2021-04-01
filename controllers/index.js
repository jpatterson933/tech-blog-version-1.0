//our index route is the default route selected from the server.js file

//Here we require our router to set up the router through controllers
const router = require('express').Router();

//we grab our apiroutes folder, it will default to the index.js inside of that folder where we can connect the other routes 
const apiRoutes = require('./api');

module.exports = router;
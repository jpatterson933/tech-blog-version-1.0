//our index route is the default route selected from the server.js file

//Here we require our router to set up the router through controllers
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);

module.exports = router;
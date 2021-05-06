const router = require('express').Router();

const apiRoutes = require('./api');
const main = require('./main');

//grabs our main route file and our api routes folder
router.use('/', main);
router.use('/api', apiRoutes);

module.exports = router;
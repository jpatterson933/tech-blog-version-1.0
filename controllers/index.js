const router = require('express').Router();

//folder
const apiRoutes = require('./api');

//files
const main = require('./main');

router.use('/', main);
router.use('/api', apiRoutes);



module.exports = router;
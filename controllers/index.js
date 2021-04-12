const router = require('express').Router();

const apiRoutes = require('./api');
const main = require('./main');
const dash = require('./dash');

router.use('/', main);
router.use('/dash', dash);
router.use('/api', apiRoutes);



module.exports = router;
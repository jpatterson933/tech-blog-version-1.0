//require the express router
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//our index grabs our three api routes
router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)

module.exports = router;
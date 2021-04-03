//Here we require our router to set up the router through controllers
const router = require('express').Router();


router.use('/', async (req, res) => {
    try {
        res.render('login');
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});
router.use('/home', async (req, res) => {
    try {
        res.render('home');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});
router.use('/dash', async (req, res) => {
    try {
        res.render('dash');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});
module.exports = router;
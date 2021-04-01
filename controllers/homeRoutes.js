//Here we require our router to set up the router through controllers
const router = require('express').Router();

router.use('/', async (req, res) => {
    try {
        res.render('main')
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})



module.exports = router;
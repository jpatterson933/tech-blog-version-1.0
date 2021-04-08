//Here we require our router to set up the router through controllers
const router = require('express').Router();
const { User, Post} = require('../models');

router.get('/login', async (req, res) => {
    try {
        res.render('login');
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/', async (req, res) => {
    try {
        res.render('home', {loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// router.get('/dash', async (req, res) => {
//     try {
//         res.render('dash', {loggedIn: req.session.loggedIn});

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     };
// });


router.get('/dash', async (req, res) => {
    try {
        const postData = await Post.findAll();
        console.log(postData)
        const myPost = postData.map(posts => posts.get({ plain: true }));
        console.log(myPost, "this is mapped")
        res.render('dash', { myPost, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;
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
        const userData = await User.findAll();
        
        const myPost = postData.map(posts => posts.get({ plain: true }));

        const post = postData.filter( posts => {
            posts.get({ plain: true });

            const postId = posts.dataValues.user_id;

            console.log(posts.dataValues.user_id, "user id")
            return postId;
        })
        
        const user = userData.filter( users => {
            users.get({ plain: true })
            const userId = users.dataValues.id;
            console.log(users.dataValues.id, "id")
            return userId;
        });
        console.log(user, "another test")

        // const user = userData.map(users => users.get({ plain: true }));


        // for (let i = 0; i < user.length; i++) {
        //     console.log(user[i].id, "this works")
        // }
        // console.log(user[1].id, "testing 123----------------------------------------")
        // for (let i = 0; i < myPost.length; i++) {
        //     console.log(myPost[i].user_id, "post id here")
        // }
        // console.log(myPost[3].user_id, "--------------------------1234-----------------------")

        
        // console.log(myPost[1], "post data array")
        // console.log(user, "user data array")

        
            // console.log(postData)
            // console.log(myPost, "this is mapped")
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
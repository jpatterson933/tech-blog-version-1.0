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



//this rout is responsidble for finding the user and the posts associated with that user and displaying them on the dash page
router.get('/dash', async (req, res) => {
    try {
        let userData = await User.findOne({ 
            where: {
                id: req.session.user_id
            },
            //here we include the post that belongs to the user_id
            include: Post
        });
        let myPost = userData.get({ plain: true });
        myPost = myPost.posts;
            res.render('dash', { myPost, loggedIn: req.session.loggedIn })    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dash/edit-post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        const post = dbPostData.get({ plain: true });
        console.log(post)

        res.render('edit-post', {post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

//this route will be responsible for updating the posts in the post api
router.put('/dash/edit-post/:id', async (req,res) => {
    try {
        const post = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    };
});



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;
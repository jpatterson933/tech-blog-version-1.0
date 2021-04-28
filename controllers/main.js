//Here we require our router to set up the router through controllers
const router = require('express').Router();
const { User, Post, Comment} = require('../models');

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
        const dbPostData = await Post.findAll();
        const post = dbPostData.map((posts) => posts.get({ plain: true }));

        res.render('home', {post, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
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
        console.log(myPost, "THIS IS MY POST CONSOLE LOG TECH BLOG NEWS")
        // if (myPost !== null) {
            res.render('dash', { myPost, loggedIn: req.session.loggedIn })    
        // }
        // res.render('dash', { loggedIn: req.session.loggedIn }) 
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dash/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        console.log("testing123456")
        const post = dbPostData.get({ plain: true });

        const scripts = "/js/edit-post.js";

        res.render('edit-post', {post, loggedIn: req.session.loggedIn, scripts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


//this is our route to delete posts
router.delete('/dash/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
            id: req.params.id,
            },
        });
        console.log(postData, "this is the post data!!--------------");
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);

      const scripts = "/js/edit-post.js";

      res.render('dash')
    } catch (err) {
      res.status(500).json(err);
    }
  });

//this route will be responsible for updating the posts in the post api
router.put('/dash/:id', async (req,res) => {
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
            res.render('dash', {post, loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err);
    };
});

//this route is responsible for rendering the contents of our /dash/view/:id of the post page --
router.get('/dash/view/:id', async (req, res) => {
    try {
        
        const scripts = "/js/comment.js";
        const dbPostData = await Post.findByPk(req.params.id);

        const post = dbPostData.get({ plain: true });

        //this is where we will nee to render the comments by post_id so the ONLY the comments for the post rener

        //we are finding all the comments - we need to find the comments that only match the post ID
        const commentData = await Comment.findAll();
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('view-post', {post, comments, loggedIn: req.session.loggedIn, scripts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


module.exports = router;
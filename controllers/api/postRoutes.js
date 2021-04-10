const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    const dbPostData = await Post.findAll()
    res.json(dbPostData) 
    res.render('post')
})

//this route will be responsible for finding the post that was clicked on and rendering it on our edit-post page
router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        const post = dbPostData.get({ plain: true });
        console.log(post, "is this working?")

        res.render('edit-post', {post, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


//this route will be responsible for updating the posts in the post api
router.put('/api/post/:id', async (req,res) => {
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


//this route is responsible for createing a new post and storing it in our post api
router.post('/', async (req, res) => {
    //find user 
    const user = await User.findOne( {
        where: {
            username: req.body.username,
        }
    })
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: user.id,
    })
    .then(response => {
        console.log(response);
        res
            .status(200)
            .json(response);
    })
    .catch (err => {
        console.log(err);
        res
            .status(400)
            .json(err);
    })
})

module.exports = router;
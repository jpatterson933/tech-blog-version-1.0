const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    const dbPostData = await Post.findAll()
    res.json(dbPostData) 
    res.render('post')
})


//this route is responsible for creating a new post and storing it in our post api
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
        username: req.body.username,
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
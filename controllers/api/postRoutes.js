const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    const dbPostData = await Post.findAll()
    res.json(dbPostData) 
    res.render('post')
})

router.post('/', async (req, res) => {

    //find user 
    const user = await User.findOne( {
        where: {
            username: req.body.username,
        }
    })

    console.log("this is new", user)
    
    // const user = await User.findByPk(req.session.id)
    // if (user === null) {
    //     res.status(401).json("not logged in")
    //     return;
    // } 

    // console.log(req.session.id)
    // console.log("Hello router.post('/'", user)

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
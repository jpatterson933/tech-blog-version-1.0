const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


//this route is responsible for creating a new post and storing it in our post api
router.post('/', async (req, res) => {
    //find user

   
    const user = await User.findOne( {
        where: {
            username: req.body.username,
        }
    })
    Comment.create({
        content: req.body.content,
        user_id: user.id,
    })
    .then(response => {
        console.log(response);
        res
            .status(200)
            .json(response)
    })
    .catch (err => {
        console.log(err);
        res
            .status(400)
            .json(err);
    });
});

module.exports = router;
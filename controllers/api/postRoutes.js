const router = require('express').Router();

const { Post } = require('../../models');



router.post('/', async (req, res) => {

    if (loggedIn) {
        try {
            const dbPostData = await Post.create({
                title: req.body.title,
                content: req.body.content,
                date: req.body.date,
            });
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
})

module.exports = router;
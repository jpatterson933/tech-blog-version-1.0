const { User, Post} = require('../models');

const router = require('express').Router();

router.get('/dash', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const myPost = postData.map(posts => posts.get({ plain: true }));
        res.render('dash', { myPost })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
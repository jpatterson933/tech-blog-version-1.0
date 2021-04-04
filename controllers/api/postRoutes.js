const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    const dbPostData = await Post.findAll()
    res.json(dbPostData) 
    res.render('post')
})

router.post('/', async (req, res) => {
    Post.create(req.body)
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
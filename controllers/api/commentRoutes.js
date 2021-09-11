const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

//this route is responsible for rendering the contents of our /dash/view/:id of the post page --still need to render only the posts comments--
router.get('/', async (req, res) => {
  try {
    const scripts = "/js/comment.js";
    const commentData = await Comment.findAll({ where: { post_id: req.params.id } });
    res.json(commentData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

//this route is responsible for creating a new post and storing it in our post api
router.post('/', async (req, res) => {
  try {
    await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const newComment = await Comment.create({
      ...req.body,
      username: req.body.username,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err, "what is our error?");
  }
});


module.exports = router;
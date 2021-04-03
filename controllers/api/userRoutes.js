//require the express router
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserInfo = await User.create({
            username: req.body.username,
            password: req.body.password,
            stayLogged: req.body.stayLogged,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserInfo);
        });
    } catch (err) {
        console.log(err);
        res.status.json(err);
    };
});

module.exports = router;
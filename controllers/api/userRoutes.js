//require the express router
const router = require('express').Router();

const { User } = require('../../models');



//create user
router.post('/', async (req, res) => {
    try {
        const dbUserInfo = await User.create({
            username: req.body.username,
            password: req.body.password,
            stayLogged: req.body.stayLogged,
        });
        //save user session
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserInfo.id;
            res
            .status(200)
            .json(dbUserInfo);
            // console.log(dbUserInfo);
        });

    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json(err);
    };
});

//login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!dbUserData) {
            console.log("no user")
            res.status(400)
                .json({message: 'User does not exist'});
            return;
        }
        //check password to see if it matches what the user entered
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword){
            res.status(400)
                .json({message: 'Incorrect username or password. Please try again'});
                return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            
            req.session.user_id = dbUserData.id;
            //you can create any variable here and refer to the properties of the user and save that in the session and then
            //later on refer to it within the other routes

            res.status(200)
                .json({ user: dbUserData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
            res.status(500).json(err);
    };
});

//logout

router.post('/logout', (req, res) => {
    
    if (req.session.loggedIn) {
        //destroy current session
        req.session.destroy(() => {
             res
            .status(304)
            .end() });
  
    } else {
        res.status(404).end();
    }
})

module.exports = router;
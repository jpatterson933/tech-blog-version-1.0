const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
        //if you are inactive for 1 minute, you will be logged out.
        checkExpirationInterval: 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (60 seconds)
        expiration: 60 * 1000  // The maximum age (in milliseconds) of a valid session (60seconds)
    })
};

app.use(session(sess));

const hbs = exphbs.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set up static assets in public folder to be used on front end
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

module.exports = app;

// require packages for testing
const request = require('supertest');

// require packages for file testing
const session = require('express-session');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { app, sess } = require('./server');

const sequelize = require('./config/connection');


describe('Session Configuration', () => {

    test('should have the correct session configuration', () => {
        let expectedSecret = 'Super secret secret';
        // let expectedCookie = '{}';
        let expectedResave = false;
        let expectedSaveUninitialized = false;
        expect(sess.secret).toBe(expectedSecret);
        // expect(sess.cookie).toBe(expectedCookie);
        expect(sess.resave).toBe(expectedResave);
        expect(sess.saveUninitialized).toBe(expectedSaveUninitialized);

    })


})


describe('Test Express Server', () => {
    let server;

    // setup sequelzie connection
    beforeAll(async () => {
        await sequelize.authenticate();
        process.env.PORT = 5000;
        server = app.listen(process.env.PORT)
        await sequelize.sync({ force: false })
    });

    // close database connection
    afterAll(async () => {
        await server.close();
        await sequelize.close();
    });

    test('should return a 200 status code for the home route', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });


});
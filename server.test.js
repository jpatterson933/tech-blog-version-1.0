// require packages for testing
const request = require('supertest');

// require packages for file testing
const session = require('express-session');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { app, sess } = require('./server');

const sequelize = require('./config/connection');

// describe('Server Setup', () => {
//     beforeAll(async () => {
//         await sequelize.sync({force: false})
//     })
// })

// // set up and mock the mysql2 connection
// jest.mock('sequelize', () => {
//     const mSquelize = {
//         authenticate: jest.fn()
//     };
//     return jest.fn(() => mSquelize)
// });

describe('Session Configuration', () => {
    test('should have the correct session secret', () => {
        const expectedSecret = 'Super secret secret';
        const actualSecret = sess.secret;
        expect(actualSecret).toBe(expectedSecret);
    });

    test('should have the correct session expiration', () => {
        const expectedExpiration = 60 * 1000; // 60 seconds 
        const actualExpiration = sess.store.expiration();
        console.log(expectedExpiration, actualExpiration())
        expect(actualExpiration).toBe(expectedExpiration);
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
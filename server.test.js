const request = require('supertest');
const app = require('./server');
const sequelize = require('./config/connection');

// describe('Server Setup', () => {
//     beforeAll(async () => {
//         await sequelize.sync({force: false})
//     })
// })



describe('Server Setup', () => {

    // setup sequelzie connection
    beforeAll(async () => {
        await sequelize.sync({ force: false })
    });

    // close database connection
    afterAll(async () => {
        await sequelize.close();
    });

    test('should return a 200 status code for the home route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
const mysql = require('mysql2');
const Sequelize = require('sequelize');

// set up and mock the mysql2 connection
jest.mock('sequelize', () => {
    const mSquelize = {
        authenticate: jest.fn()
    };
    return jest.fn(() => mSquelize)
});

describe("Testing our database connection variables", () => {

    test('creates and connects to the database correct', () => {

        const sequelize = require('./connection');

        // check that Sequelize constructor was called with correct parameters
        if (process.env.JAWSDB_URL) {
            expect(Sequelize).toHaveBeenCalledWith(process.env.JAWSDB_URL);
        } else {
            expect(Sequelize).toHaveBeenCalledWith(
                process.env.DB_NAME,
                process.env.DB_USER,
                process.env.DB_PASSWORD,
                {
                    host: 'localhost',
                    port: 3306,
                    dialect: 'mysql',
                }
            );
        }

        // check that authenticate was called to establish the connection
    });
});
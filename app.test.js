const request = require('supertest')
const app = require('./app');

describe("GET /login", () => {
    describe("when the login route is hit, the login page is rendered", () => {
        // should render the login page res.render('login')
        // status of 200 should be sent

    
        test("should respond with a 200 status code and should render 'login'", async () => {
            const response = await request(app).get("/login");
            expect(response.statusCode).toBe(200)
            // expect(response.render).toHaveBeenCalledWith(expect.stringContaining('login'))
        })
    })

    // failed route hit
    // describe("if for some reason the /login page is not able to be rendered", () => {
    //    // status code of 500 should be sent back
    //    // not exactly sure how to write this
    // })
});

// describe()
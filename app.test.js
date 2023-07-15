import supertest from "supertest";
import app from './app';

describe("GET /login", () => {
    describe("when the login route is hit, the login page is rendered", () => {
        // should render the login page res.render('login')
        
    })

    // failed route hit
    describe("if for some reason the /login page is not able to be rendered", () => {
        // status code of 500 should be sent back
    })
})
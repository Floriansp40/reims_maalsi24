/*** IMPORT */
const request = require('supertest')
const DB = require('../api/db.config')
const app = require('../api/app')

let userID

describe('USER ROUTE', () => {

    afterAll( async () => {
        await DB.sequelize.close()
    })

    describe('TRY PUT', () => {
        it('Should return 400 /=> missing data', async () => {
            const response = await request(app)
                .put('/users')
                .send({                    
                    //email: 'marcel@roger.com',
                    password: 'roger'
                })
            expect(response.status).toBe(400)
        })

        it('Should return 201 /=> new User', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    email: 'marcel@roger.com',
                    password: 'roger'
                })
            expect(response.status).toBe(201)
            userID = response.body.data.id
        })
    })

    describe('TRY GET', () => {
        it('Sould return 200 /=> Get All Users', async () => {
            const response = await request(app).get(`/users`)
            expect(response.status).toBe(200)
        })
        it('Should return 200 /=> Get user', async () => {
            const response = await request(app).get(`/users/${userID}`)
            expect(response.status).toBe(200)
        })
        it('Should return 404 /=> Get bad user', async () => {
            const response = await request(app).get(`/users/11111111111111111111`)
            expect(response.status).toBe(404)
        })
    })

    describe('TRY PATCH', () => {
        it("Sould return 409 /=> Modify bad user", async () => {
            const response = await request(app)
                .patch('/users/111111111111111111111')
                .send({
                    email: 'roger@marcel.com'
                })
            expect(response.status).toBe(409)
        })
        it("Sould return 200 /=> Modify user", async () => {
            const response = await request(app)
                .patch(`/users/${userID}`)
                .send({
                    email: 'marcel@roger.com'
                })
            expect(response.status).toBe(200)
        })
    })

    describe('TRY DELETE', () => {
        it('Sould return 204', async () => {
            const response = await request(app)
                .delete(`/users/${userID}`)
            expect(response.status).toBe(204)
        })
    })
})
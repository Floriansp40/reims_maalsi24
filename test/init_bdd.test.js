/*** IMPORT */
const DB = require('../api/db.config')

describe('INIT BDD', () => {
    afterAll(async () => {
        DB.sequelize.close()
    })

    describe('POPULATE DATABASE', () => {
        it('Should return model object', async () => {
            const response = await DB.sequelize.sync({alter: true})
            expect(response).toHaveProperty('models')
        })
    })
})
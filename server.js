/*** IMPORT  */
const app = require('./api/app')
const db = require('./api/db.config')

/*** START SERVER */
db.sequelize.authenticate()
    .then(() => console.log("Database OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(e => console.log(e))
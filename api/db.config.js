/*** IMPORT */
const { Sequelize } = require('sequelize')

/*** DATABASE CNX */
let sequelize = new Sequelize(
    process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASS,{
        host: process.env.BDD_HOST,
        port: process.env.BDD_PORT,
        dialect: 'mysql',
        logging: false
    }
)

const db = {}
db.sequelize = sequelize
db.User = require('./models/user_m')(sequelize)

/*** SYNCHRO */
// db.sequelize.sync({alter: true})

module.exports = db
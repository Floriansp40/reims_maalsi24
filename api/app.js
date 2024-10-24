/*** IMPORT */
const express = require('express')
const cors = require('cors')
const checkToken = require('./middleware/mid_jwt')

/*** INIT  */
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/*** IMPORT ROUTER */
const auth_router = require('./routes/auth_r')
const user_router = require('./routes/user_r')

/*** MAIN ROUTER */
app.get('/', (req, res) => res.send("I'm Online"))

app.use('/auth', auth_router)
app.use('/users', user_router)

app.all('*', (req, res) => res.status(501).send("What the hell are you doing ?"))

module.exports = app
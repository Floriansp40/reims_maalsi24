/*** IMPORT */
const express = require('express')
const authCtrl = require('../controllers/auth_c')

/*** EXPRESS ROUTER */
let router = express.Router()

/*** USER ROUTE */
router.post('/login', authCtrl.login)

module.exports = router
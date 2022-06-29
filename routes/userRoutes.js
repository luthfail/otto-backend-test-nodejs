const express = require('express')
const router = express.Router()
const Controller = require('../controllers/UserController')
const auth = require('../middleware/authentication')

router.get('/info', Controller.accountInfo)
router.get('/balance', Controller.balanceInfo)

module.exports = router
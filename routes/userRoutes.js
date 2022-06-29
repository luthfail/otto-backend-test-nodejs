const express = require('express')
const router = express.Router()
const Controller = require('../controllers/UserController')
const auth = require('../middleware/authentication')

router.get('/info', auth, Controller.accountInfo)
router.get('/balance', auth, Controller.balanceInfo)
router.post('/topup', auth, Controller.topUp)

module.exports = router
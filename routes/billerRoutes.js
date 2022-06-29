const express = require('express')
const router = express.Router()
const Controller = require('../controllers/BillerController')
const auth = require('../middleware/authentication')

router.get('/', Controller.getAllBiller)
router.get('/history', Controller.readHistory)
router.get('/:billerid', auth, Controller.getBillerDetail)
router.post('/:billerid', auth, Controller.createTransaction)
router.put('/:billerid', auth, Controller.createPayment)

module.exports = router
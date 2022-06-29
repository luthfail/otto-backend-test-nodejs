const express = require('express')
const router = express.Router()
const Controller = require('../controllers/UserController')
const userRoutes = require('./userRoutes')
const billerRoutes = require('./billerRoutes')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use('/account', userRoutes)
router.use('/payment', billerRoutes)
router.get('/success', (req, res) => {
    res.status(200).json({
        message: "success"
    })
})

module.exports = router
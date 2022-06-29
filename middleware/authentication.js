const { User } = require('../models')
const { verifyToken } = require('../helper')

const auth = async(req, res, next) => {
    try {
        const { access_token } = req.headers
        const ticket = verifyToken(access_token)
        const response = await User.findByPk(ticket.id)
        if(!response || !access_token) {
            throw ({name: 'invalid token'})
        } else {
            req.user ={
                id: response.id,
                username: response.username,
                email: response.email,
                balance: response.balance
            }
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = auth
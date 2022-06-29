const { User, Balance, sequelize } = require('../models');
const { comparePassword, generateToken } = require('../helper');
const XenditInvoice = require('../API/xendit')

class UserController {
    static async register(req, res, next) {
        const { username, email, password, phoneNumber } = req.body;
        try {
            const t = await sequelize.transaction()
            const newUser = await User.create({
                username,
                email,
                password,
                phoneNumber
            }, { transaction : t })
            await Balance.create({
                UserId: newUser.id,
                balance: 0
            }, { transaction : t })
            res.status(201).json({
                status: 201,
                message: "your account has been created",
                username: newUser.username,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({
                where: {
                    email:email
                }
            });
            if(!user) {
                throw ({name: 'INVALID'});
            } else {
                const isValid = comparePassword(password, user.password);
                if(!isValid) {
                    throw ({name: 'INVALID'});
                } else {
                    const payload = {
                        id: user.id,
                        username: user.username
                    }
                    const token = generateToken(payload);
                    res.status(200).json({
                        status: 200,
                        message: 'login success',
                        access_token: token,
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    });
                }
            }
        } catch(err) {
            next(err)
        }
    }

    static async accountInfo(req, res, next) {
        try {
            const { id } = req.user
            const response = await User.findByPk(id)
            if(!response) {
                throw({name: 'NOT_FOUND'})
            } else {
                res.status(200).json({
                    code: 200,
                    status: "success",
                    message: "",
                    id: response.id,
                    username: response.username,
                    email: response.email,
                    phoneNumber: response.phoneNumber
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async balanceInfo(req, res, next) {
        try {
            const { id } = req.user
            const response = await Balance.findOne({
                where: {
                    UserId: id
                }
            })
            if(!response) {
                throw({name: 'NOT_FOUND'})
            }
            res.status(200).json({
                code: 200,
                status: 'Success',
                message: "",
                data: response.balance
            })
        } catch (error) {
            next(error)
        }
    }

    static async topUp (req, res, next) {
        try {
            const t = await sequelize.transaction()
            const { balance } = req.body
            const { id } = req.user
            const findUser = await User.findByPk(id)
            const findWallet = await Balance.findOne({
                where: {
                    UserId : findUser.id
                }
            }, { transaction : t })
            const xenditInvoice = await XenditInvoice.createInvoice(findUser.id+'', balance, User)
            await Balance.update({
                balance : +findWallet.balance + +balance
            }, {
                where: {
                    UserId: findUser.id
                }
            }, { transaction: t })
            res.status(200).json({
                code: 200,
                status: 'success',
                message: '',
                data : xenditInvoice.invoice_url
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController
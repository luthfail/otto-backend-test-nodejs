const { Biller, Transaction, Balance, User, sequelize } = require('../models')

class BillerController {
    static async getAllBiller(req, res, next) {
        try {
            const response = await Biller.findAll({
                attributes: ['id', 'category', 'product', 'fee', 'price']
            })
            res.status(200).json({
                code: 200,
                status: "success",
                message: "",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBillerDetail(req, res, next) {
        try {
            const { billerid } = req.params
            const response = await Biller.findByPk(billerid, {
                attributes: ['id', 'category', 'product', 'fee', 'price']
            })
            res.status(200).json({
                code: 200,
                status: "success",
                message: "",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTransaction(req, res, next) {
        try {
            const { billerid } = req.params
            const { id } = req.user
            const newTransaction = await Transaction.create({
                UserId: id,
                BillerId: billerid
            })
            res.status(201).json({
                code: 201,
                status: "success",
                message: "",
                data: newTransaction
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async createPayment(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { paymentid } = req.params
            const { id } = req.user
            const findWallet = await Balance.findOne({
                where: {
                    UserId: id
                }
            }, { transaction : t })
            const findTransaction = await Transaction.findOne({
                include: [{
                    model: Biller,
                    attributes: ['id', 'category', 'product', 'price', 'fee', 'totalPay']
                }],
                where: {
                    id: paymentid,
                    UserId: id,
                    isPaid: false
                }
            }, { transaction : t})
            if(!findTransaction) {
                throw ({name: "NOT_FOUND"})
            }
            if(+findWallet.balance < +findTransaction.Biller.totalPay) {
                throw ({name: "FORBIDDEN"})
            } else {
                await Balance.update({
                    balance: +findWallet.balance - +findTransaction.Biller.totalPay,
                }, {
                    where: {
                        id: paymentid
                    },
                    transaction : t
                })
                await Transaction.update({
                    isPaid: true
                }, {
                    where: {
                        id : paymentid,
                        UserId: id,
                        isPaid: false
                    },
                    transaction: t
                })
                res.status(200).json({
                    code: 200,
                    status: 'success',
                    message: 'your payment has been updated'
                })
            }
            t.commit()
        } catch (error) {
            console.log(error)
            t.rollback()
            next(error)
        }
    }

    static async readHistory(req, res, next) {
        try {
            const { id } = req.user
            const findHistory = await Transaction.findAll({
                attributes: ["isPaid"],
                include: [{
                    model: Biller,
                    attributes: ['category', 'product', 'price', 'fee', 'totalPay']
                }],
                where: {
                    UserId: id
                }
            })
            res.status(200).json({
                code: 200,
                status: 'success',
                message: '',
                data: findHistory
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = BillerController
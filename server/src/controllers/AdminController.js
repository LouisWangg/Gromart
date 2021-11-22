const {Sequelize} = require('../models')
const {User} = require('../models')
const {Seller} = require('../models')
const {Buyer} = require('../models')
const {Product} = require('../models')
const {OrderList} = require('../models')
const {OrderDetail} = require('../models')

module.exports = {
    async showSeller (req, res) {
        try {
            const sellerList = await Seller.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name', 'createdAt']
                    },
                    {
                        model: Product,
                        attributes: [[Sequelize.fn('COUNT', Sequelize.col('productId')), 'activeProduct']]
                    }
                ],
                group: ['sellerId']
            })
            res.send(sellerList)
        } catch (error) {
            res.status(500).send({
                error: 'Error occured when trying to show the seller list'
            })
        }
    },
    async showBuyer (req, res) {
        try {
            const buyerList = await Buyer.findAll({
                attributes: [
                    'buyerId',
                    'creditLimit',
                    'invoiceLimit',
                    [Sequelize.literal('creditLimit - SUM(`OrderLists->OrderDetails`.price * `OrderLists->OrderDetails`.quantity)'), 'remainingCredit'],
                    [Sequelize.literal('invoiceLimit - COUNT(`OrderLists`.orderListId)'), 'remainingInvoice'],
                ],
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: OrderList,
                        attributes: ['orderListId', 'totalPrice', 'buyerId'],
                        include: [
                            {
                                model: OrderDetail,
                                attributes: ['orderListId', 'price', 'quantity', 'status'],
                                where: {status: "Unpaid"}
                            }
                        ],
                    }
                ],
                group: 'buyerId',
                raw: true
            })
            res.send(buyerList)
        } catch (error) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the buyer list'
            })
        }
    },
    async showProduct (req, res) {
        try {
            const productList = await Product.findAll({
                include: [
                    {
                        model: Seller,
                        include: [
                            {
                                model: User,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            })
            res.send(productList)
        } catch (error) {
            res.status(500).send({
                error: 'Error occured when trying to show the product list'
            })
        }
    },
    async detailProduct (req, res) {
        try {
            const {productId, productName, stock, price, status} = req.body
            const productList = await Product.findOne(
                {
                    productName: productName,
                    stock: stock,
                    price: price,
                    status: status
                },
                { where: { productId: productId }}
            )
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to show the detail of the product'
            })
        }
    },
    async editLimit (req, res) {
        try {
            const {sellerId, limit} = req.body
            const sellerLimit = await Seller.update(
                { limit: limit },
                { where: { sellerId: sellerId }}
            )
            res.send(sellerLimit)
        } catch (error) {
            res.status(500).send({
                error: 'Unable to update the product limit of Seller'
            })
        }
    },
    async editStatus (req, res) {
        try {
            const {sellerId, status} = req.body
            const sellerStatus = await Seller.update(
                { status: status },
                { where: { sellerId: sellerId }}
            )
            res.send(sellerStatus)
        } catch (error) {
            res.status(500).send({
                error: 'Failed to update the status of Seller'
            })
        }
    },
    async editCreditInvoice (req, res) {
        try {
            const {buyerId, creditLimit, invoiceLimit} = req.body
            const buyerCreditInvoice = await Buyer.update(
                { 
                    creditLimit: creditLimit, 
                    invoiceLimit: invoiceLimit 
                },
                { where: { buyerId: buyerId }}
            )
            res.send(buyerCreditInvoice)
        } catch (error) {
            res.status(500).send({
                error: 'Unable to change the credit and invoice limit of Buyer'
            })
        }
    },
}

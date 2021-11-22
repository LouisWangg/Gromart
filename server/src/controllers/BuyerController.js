const {Sequelize} = require('../models')
const {Buyer} = require('../models')
const {Product} = require('../models')
const {Cart} = require('../models')
const {OrderList} = require('../models')
const {OrderDetail} = require('../models')

module.exports = {
    async showProduct (req, res) {
        try {
            const productList = await Product.findAll({
                where: { status: "Active" }
            })
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to show the product list'
            })
        }
    },
    async addToCart (req, res) {
        try {
            const {buyerId, productId} = req.body
            const cartList = await Cart.create({
                buyerId: buyerId,
                productId: productId
            })
            res.send(cartList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to add the product to the cart list'
            })
        }
    },
    async showCart (req, res) {
        try {
            const cartList = await Cart.findAll({
                include: [{
                    model: Product,
                    attributes: ['productName']
                }]
            })
            res.send(cartList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to show the cart list'
            })
        }
    },
    async editQuantity (req, res) {
        try {
            const {cartId, quantity} = req.body
            const cartQuantity = await Cart.update(
                { quantity: quantity },
                { where: { cartId: cartId }}
            )
            res.send(cartQuantity)
        } catch (error) {
            res.status(500).send({
                error: 'Error occured when trying to update quantity of product in cart'
            })
        }
    },
    async deleteProduct (req, res) {
        try {
            const {cartId} = req.body.cartId
            const cartList = await Cart.findOne({ 
                where: { cartId: cartId }
            })
            cartList.destroy()
            res.send(cartList)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to delete the product'
            })
        }
    },
    async checkout (req, res) {
        price = 0, totalPrice = 0
        try {
            const {product, buyerId} = req.body
            const products = await Product.findAll({attributes: ['productId', 'stock', 'price']})
            const buyers = await Buyer.findOne({
                attributes: [
                    'buyerId',
                    'creditLimit',
                    'invoiceLimit',
                    [Sequelize.literal('creditLimit - SUM(`OrderLists->OrderDetails`.price * `OrderLists->OrderDetails`.quantity)'), 'remainingCredit'],
                    [Sequelize.literal('invoiceLimit - COUNT(`OrderLists`.orderListId)'), 'remainingInvoice'],
                ],
                include: [
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
                where: {buyerId: buyerId},
                raw: true
            })

            await product.forEach((cart) => 
                {
                    for (i = 0; i < products.length; i++) {
                        if (products[i].productId == cart.productId) {
                            stock = products[i].stock - cart.quantity
                            totalPrice += products[i].price * cart.quantity
                            if (stock <= 0) {
                                res.status(500).send({
                                    error: 'Transaction failed because the stock in inventory are not enough'
                                })
                            } 
                            else if (buyers.remainingInvoice <= 0) {
                                res.status(500).send({
                                    error: 'Transaction failed because the remaining credit are not enough'
                                })
                            } 
                            else if (buyers.remainingCredit < 0) {
                                res.status(500).send({
                                    error: 'Transaction failed because the remaining invoice are not enough'
                                })
                            } 
                            
                            if (buyers.remainingCredit == null) {
                                cartList = Product.update(
                                    { stock: stock },
                                    { where: {productId: cart.productId }}
                                )
                            } else {
                                cartList = Product.update(
                                    { stock: stock },
                                    { where: {productId: cart.productId }}
                                )
                            }
                        }
                    }
                }
            )
            const orderList = await OrderList.create({
                buyerId: buyerId,
                totalPrice: totalPrice,
            })
            await product.forEach((cart) => 
                {
                    for (i = 0; i < products.length; i++) {
                        if (products[i].productId == cart.productId) {
                            orderDetail = OrderDetail.create({ 
                                quantity: cart.quantity,
                                price: products[i].price * cart.quantity,
                                productId: products[i].productId,
                                orderListId: orderList.orderListId
                            })
                        }
                    }
                }
            )
            res.send({cartList, orderList, orderDetail})
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to do the payment'
            })
        }
    },
    async clearCart (req, res) {
        try {
            const cartList = await Cart.destroy({ 
                where: {}
            })
            res.send(cartList)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to clear the cart list'
            })
        }
    },
    async showOrderList (req, res) {
        try {
            const {buyerId} = req.body
            const orderList = await OrderList.findAll({where: {buyerId: buyerId}})
            res.send(orderList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to show the order list'
            })
        }
    },
    async showOrderDetail (req, res) {
        try {
            const {orderListId} = req.body
            const orderDetail = await OrderDetail.findAll({
                where: {orderListId: orderListId},
                include: [
                    {
                        model: Product,
                        attributes: ['productName']
                    }
                ],
            })
            res.send(orderDetail)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the order detail'
            })
        }
    },
    async payment (req, res) {
        try {
            const {orderDetailId} = req.body
            const orderDetail = await OrderDetail.update(
                {status: "Requested"},
                {where: {orderDetailId: orderDetailId}}
            )
            res.send(orderDetail)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to paid the product'
            })
        }
    },
    async buyerHeader (req, res) {
        try {
            const {buyerId} = req.body
            const buyerList = await Buyer.findOne({
                attributes: [
                    'buyerId',
                    'creditLimit',
                    'invoiceLimit',
                    [Sequelize.literal('creditLimit - SUM(`OrderLists->OrderDetails`.price * `OrderLists->OrderDetails`.quantity)'), 'remainingCredit'],
                    [Sequelize.literal('invoiceLimit - COUNT(`OrderLists`.orderListId)'), 'remainingInvoice'],
                ],
                include: [
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
                where: {buyerId: buyerId},
                raw: true
            })
            res.send(buyerList)
        } catch (error) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the buyer header data'
            })
        }
    },
}
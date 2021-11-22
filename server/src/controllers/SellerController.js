const {Product} = require('../models')
const {User} = require('../models')
const {Seller} = require('../models')
const {OrderList} = require('../models')
const {OrderDetail} = require('../models')

module.exports = {
    addProduct (req, res) {
        try {
            const {productName, stock, price, sellerId, limit} = req.body
            Product.count({
                where: {
                    sellerId: sellerId
                }
            }).then(async c => {
                if (c >= limit) {
                    res.status(500).send({
                        error: 'Limit of product that can be made by Seller has been reached'
                    })
                } else {
                    const product = await Product.create({
                        productName: productName,
                        stock: stock,
                        price: price,
                        sellerId: sellerId
                    })
                    res.send(product)
                }
            })
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to create a product'
            })
        }
    },
    async showProduct (req, res) {
        try {
            const productList = await Product.findAll()
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to show the product list'
            })
        }
    },
    async editProduct (req, res) {
        try {
            const {productId, productName, status, stock, price} = req.body
            const productList = await Product.update({ 
                    productName: productName,
                    status: status, 
                    stock: stock,
                    price: price
                },
                { where: { productId: productId }}
            )
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to edit the product'
            })
        }
    },
    async deleteProduct (req, res) {
        try {
            const {productId} = req.body.productId
            const productList = await Product.findOne({ 
                where: { productId: productId }
            })
            productList.destroy()
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error occured when trying to delete the product'
            })
        }
    },
    async showOrderList (req, res) {
        try {
            const {sellerId} = req.body
            const orderDetail = await OrderDetail.findAll({
                where: {status: "Requested"},
                include: [
                    {
                        model: Product,
                        attributes: ['sellerId'],
                        where: {sellerId: sellerId},
                        include: [
                            {
                                model: Seller,
                                attributes: ['userId'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    }
                ],
            })
            res.send(orderDetail)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the order list'
            })
        }
    },
    async approveOrder (req, res) {
        try {
            const {orderDetailId} = req.body
            const orderDetail = await OrderDetail.update(
                {status: "Accepted"},
                {where: {orderDetailId: orderDetailId}}
            )
            res.send(orderDetail)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to approve the order'
            })
        }
    },
    async showReport (req, res) {
        try {
            const {sellerId} = req.body
            const orderDetail = await OrderDetail.findAll({
                where: {status: "Accepted"},
                include: [
                    {
                        model: Product,
                        attributes: ['productName', 'sellerId'],
                        where: {sellerId: sellerId},
                        include: [
                            {
                                model: Seller,
                                attributes: ['userId'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    }
                ],
            })
            res.send(orderDetail)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the order list'
            })
        }
    },
    async fetchData (req, res) {
        try {
            const {sellerId} = req.body
            const dataList = await OrderDetail.findAll({
                where: {status: "Accepted"},
                attributes: ['Product.productName', 'quantity', 'price', 'status', 'createdAt'],
                include: [
                    {
                        model: Product,
                        attributes: [],
                        where: {sellerId: sellerId}
                    }
                ],
                raw: true
            })
            res.send(dataList)
        } catch (err) {
            res.status(500).send({
                error: err + 'Error occured when trying to show the order list'
            })
        }
    },
}
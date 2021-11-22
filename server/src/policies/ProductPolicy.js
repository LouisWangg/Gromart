const Joi = require('joi')

module.exports = {
    addProduct (req, res, next) {
        const schema = Joi.object({
            productName: Joi.string(),
            stock: Joi.number().integer().positive(),
            price: Joi.number().integer().positive(),
            sellerId: Joi.number().integer(),
            limit: Joi.number().integer()
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'productName' :
                    res.status(400).send({
                        error: 'You must provide a valid product name'
                    })
                    break

                case 'stock' :
                    res.status(400).send({
                        error: `The number of stock you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'price' :
                    res.status(400).send({
                        error: `The number of price you provided failed to match the following rules : 
                        <br>
                        1. It can only contain Integer format (without floating point)
                        <br>
                        2. It must be a positive number 
                    `
                    })
                    break

                case 'sellerId' :
                    res.status(400).send({
                        error: 'The provided sellerId cannot be used'
                    })
                    break

                case 'limit' :
                    res.status(400).send({
                        error: 'The provided limit cannot be used'
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid add product information'
                    })
            }
        } else {
            next()
        }
    },
    editProduct (req, res, next) {
        const schema = Joi.object({
            productId: Joi.number().integer(),
            productName: Joi.string(),
            status: Joi.string(),
            stock: Joi.number().integer().positive(),
            price: Joi.number().integer().positive(),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'productId' :
                    res.status(400).send({
                        error: 'Provided product ID is not valid'
                    })
                    break

                case 'productName' :
                    res.status(400).send({
                        error: 'You must provide a valid product name'
                    })
                    break

                case 'status' :
                    res.status(400).send({
                        error: 'You must provide a valid product status'
                    })
                    break

                case 'stock' :
                    res.status(400).send({
                        error: `The number of quantity you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'price' :
                    res.status(400).send({
                        error: `The number of price you provided failed to match the following rules : 
                        <br>
                        1. It can only contain Integer format (without floating point)
                        <br>
                        2. It must be a positive number 
                    `
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid add product information'
                    })
            }
        } else {
            next()
        }
    },
    editQuantity (req, res, next) {
        const schema = Joi.object({
            cartId: Joi.number().integer(),
            quantity: Joi.number().integer().positive(),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'cartId' :
                    res.status(400).send({
                        error: 'Provided cart ID is not valid'
                    })
                    break

                case 'quantity' :
                    res.status(400).send({
                        error: `The number of quantity you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid add product information'
                    })
            }
        } else {
            next()
        }
    }
}

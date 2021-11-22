const Joi = require('joi')

module.exports = {
    editCreditInvoice (req, res, next) {
        const schema = Joi.object({
            buyerId: Joi.number().integer(),
            creditLimit: Joi.number().integer().positive(),
            invoiceLimit: Joi.number().integer().positive()
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'buyerId' :
                    res.status(400).send({
                        error: 'Provided buyer ID is not valid'
                    })
                    break

                case 'creditLimit' :
                    res.status(400).send({
                        error: `The number of credit limit you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'invoiceLimit' :
                    res.status(400).send({
                        error: `The number of invoice limit you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break
    
                default :
                    res.status(400).send({
                        error: 'Invalid add buyer information'
                    })
            }
        } else {
            next()
        }
    },
    editLimit (req, res, next) {
        const schema = Joi.object({
            sellerId: Joi.number().integer(),
            limit: Joi.number().integer().positive(),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'sellerId' :
                    res.status(400).send({
                        error: 'Provided seller ID is not valid'
                    })
                    break

                case 'limit' :
                    res.status(400).send({
                        error: `The number of product limit you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'invoiceLimit' :
                    res.status(400).send({
                        error: `The number of invoice limit you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break
    
                default :
                    res.status(400).send({
                        error: 'Invalid add buyer information'
                    })
            }
        } else {
            next()
        }
    },
}

const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(), //format email harus string & email
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$') //format password harus string & karakter & lengthny 8-32 karakter 
            ),
            name: Joi.string(),
            role: Joi.string(),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email' :
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break

                case 'password' :
                    res.status(400).send({
                        error: `The password you provided failed to match the following rules : 
                            <br>
                            1. It must contain ONLY the following characters : lower case, upper case, and numerics
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters 
                        `
                    })
                    break

                case 'name' :
                    res.status(400).send({
                        error: 'Name of the user has not been assigned'
                    })
                    break

                case 'role' :
                    res.status(400).send({
                        error: 'The role has not been assigned'
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    },
    editProfile (req, res, next) {
        const schema = Joi.object({
            userId: Joi.number().integer(),
            email: Joi.string().email(),
            oldPassword: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            newPassword: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            confirmNewPassword: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'userId' :
                    res.status(400).send({
                        error: 'Provided user ID is not valid'
                    })
                    break

                case 'email' :
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break

                case 'oldPassword' :
                    res.status(400).send({
                        error: `The old password you provided failed to match the following rules : 
                            <br>
                            1. It must contain ONLY the following characters : lower case, upper case, and numerics
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters 
                        `
                    })
                    break

                case 'newPassword' :
                    res.status(400).send({
                        error: `The new password you provided failed to match the following rules : 
                            <br>
                            1. It must contain ONLY the following characters : lower case, upper case, and numerics
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters 
                        `
                    })
                    break

                case 'confirmNewPassword' :
                    res.status(400).send({
                        error: `The confirmation password you provided failed to match the following rules : 
                            <br>
                            1. It must contain ONLY the following characters : lower case, upper case, and numerics
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters 
                        `
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid edit profile information'
                    })
            }
        } else {
            next()
        }
    }
}

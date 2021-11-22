const {User} = require('../models')
const {Seller} = require('../models')
const {Buyer} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcryptjs')

function jwtSignUser (user) { // to sign using a user object and give back a JWT token
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const {email, password, name, role} = req.body
            const user = await User.create({
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
                name: name,
                role: role
            })
            const userJson = user.toJSON()

            if (userJson.role == "Seller") {
                const seller = await Seller.create({
                    userId: user.userId
                })

                res.send({ //send back this object to client who requested this endpoint
                    user: userJson,
                    seller: seller.toJSON(),
                    token: jwtSignUser(userJson),
                })
            } else {
                const buyer = await Buyer.create({
                    userId: user.userId
                })

                res.send({ //send back this object to client who requested this endpoint
                    user: userJson,
                    buyer: buyer.toJSON(),
                    token: jwtSignUser(userJson),
                })
            }
        } catch (error) {
            res.status(400).send({ 
                error: 'This email account is already taken.'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            const userJson = user.toJSON()

            if (!user) {
                return res.status(403).send({
                    error: 'The login information is incorrect'
                })
            }

            if (userJson.role == "Admin") {
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            }

            const isPasswordValid = bcrypt.compareSync(password, userJson.password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information is incorrect'
                })
            }

            if (userJson.role == "Seller") {
                const seller = await Seller.findOne({
                    where: {
                        userId: user.userId
                    }
                })
                res.send({
                    user: userJson,
                    seller: seller.toJSON(),
                    token: jwtSignUser(userJson),
                })
            } else if (userJson.role == "Buyer") {
                const buyer = await Buyer.findOne({
                    where: {
                        userId: user.userId
                    }
                })
                res.send({
                    user: userJson,
                    buyer: buyer.toJSON(),
                    token: jwtSignUser(userJson),
                })
            }
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured when trying to log in'
            })
        }
    },
    async editProfile (req, res) {
        try {
            const {userId, email, oldPassword, newPassword, confirmNewPassword} = req.body
            const userList = await User.findOne({
                where: {userId: userId}
            })

            const isPasswordValid = bcrypt.compareSync(oldPassword, userList.password)
            if (isPasswordValid && (newPassword == confirmNewPassword)) {
                const user = await User.update(
                    {
                        email: email,
                        password: bcrypt.hashSync(confirmNewPassword, bcrypt.genSaltSync())
                    },
                    { where: { userId: userList.userId }},
                )

                res.send(user)
            }
        } catch (error) {
            res.status(500).send({
                error: error + 'An error has occured when trying to edit profile'
            })
        }
    },
}

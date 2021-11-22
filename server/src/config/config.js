module.exports = {
    port: process.env.PORT || 8081,
    db: {
        options: {
            host: 'localhost',
            port: '3306',
            database: 'gromart',
            dialect: 'mysql',
            username: 'root',
            password: ''
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret' // to pass the JWT token to a secret string that is known only by the
                                                      // server, and it will be used to determine whether the token is valid 
                                                      // or not
    }
}

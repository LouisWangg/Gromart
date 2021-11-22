module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true, //jadi tiap email dbs ke duplicate
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:  false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    User.associate = models => {
        User.hasOne(models.Seller, {
            foreignKey: 'userId',
            onDelete: "cascade"
        }),
        User.hasOne(models.Buyer, {
            foreignKey: 'userId',
            onDelete: "cascade"
        })
    }

    return User
}
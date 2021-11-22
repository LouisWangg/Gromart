module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define('Buyer', {
        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        creditLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100000
        },
        invoiceLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        }
    })

    Buyer.associate = models => {
        Buyer.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: "cascade"
        }),
        Buyer.hasMany(models.OrderList, {
            foreignKey: 'buyerId',
            onDelete: "cascade"
        })
    }

    return Buyer
}

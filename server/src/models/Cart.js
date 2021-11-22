module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            defaultValue: 1
        }
    })

    Cart.associate = models => {
        Cart.belongsTo(models.Buyer, {
            foreignKey: 'buyerId',
            onDelete: "cascade"
        }),
        Cart.belongsTo(models.Product, {
            foreignKey: 'productId',
            onDelete: "cascade"
        })
    }
    
    return Cart
}

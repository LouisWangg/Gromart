module.exports = (sequelize, DataTypes) => {
    const OrderList = sequelize.define('OrderList', {
        orderListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    OrderList.associate = models => {
        OrderList.belongsTo(models.Buyer, {
            foreignKey: 'buyerId',
            onDelete: "cascade"
        }),
        OrderList.hasMany(models.OrderDetail, {
            foreignKey: 'orderListId',
            onDelete: "cascade"
        })
    }
    
    return OrderList
}

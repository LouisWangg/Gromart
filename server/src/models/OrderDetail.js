module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        orderDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unpaid"
        },
    })

    OrderDetail.associate = models => {
        OrderDetail.belongsTo(models.OrderList, {
            foreignKey: 'orderListId',
            onDelete: "cascade"
        }),
        OrderDetail.belongsTo(models.Product, {
            foreignKey: 'productId',
            onDelete: "cascade"
        })
    }
    
    return OrderDetail
}

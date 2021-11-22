module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull:  false,
        },
        stock: {
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
            defaultValue: "Active"
        }
    })

    Product.associate = models => {
        Product.belongsTo(models.Seller, {
            foreignKey: 'sellerId',
            onDelete: "cascade"
        })
    }
    
    return Product
}
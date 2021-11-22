module.exports = (sequelize, DataTypes) => {
    const Seller = sequelize.define('Seller', {
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Requested"
        }
    })
    
    Seller.associate = models => {
        Seller.hasOne(models.Product, {
            foreignKey: 'sellerId',
            onDelete: "cascade"
        }),
        Seller.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: "cascade"
        })
    }

    return Seller
}


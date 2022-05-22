const db = require("../config/db")
const { DataTypes } = require("sequelize")

const Acc_Product = db.define(
    "acc_product",
    {
        is_acc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        acc_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        request_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    }, {
        timestamps: false
    }
)

module.exports = Acc_Product;

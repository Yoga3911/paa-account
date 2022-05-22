const db = require("../config/db")
const { DataTypes } = require("sequelize");
const Category = require("./Category");

const Product = db.define(
    "product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: Category,
                key: "category_id"
            },
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }
)

module.exports = Product;

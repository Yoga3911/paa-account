const db = require("../config/db")
const { DataTypes } = require("sequelize");
const Product = require("./Product");

const Review = db.define(
    "review",
    {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "product_id"
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }
)

module.exports = Review;

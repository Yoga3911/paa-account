const db = require("../config/db")
const { DataTypes } = require("sequelize")

const Category = db.define(
    "category",
    {
        category_id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
        timestamps: false
    }
)

module.exports = Category;

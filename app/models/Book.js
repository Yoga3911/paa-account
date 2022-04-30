const db = require("../config/db")
const { DataTypes } = require("sequelize")

const Book = db.define(
    "book",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)

module.exports = Book;
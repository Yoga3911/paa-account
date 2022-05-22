const db = require("../config/db")
const { DataTypes } = require("sequelize");

const RPhoto = db.define(
    "rphoto",
    {
        rphoto_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        timestamps: false
    }
)

module.exports = RPhoto;

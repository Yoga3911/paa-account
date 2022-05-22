const db = require("../config/db")
const { DataTypes } = require("sequelize");
const Admin = require("./Admin");
const User = require("./User");

const Req_to_be_seller = db.define(
    "request_to_be_seller",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "user_id"
            },
        },
        admin_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: Admin,
                key: "admin_id"
            },
        },
        shop_address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        shop_image: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        request_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        acc_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: false
    }
)

module.exports = Req_to_be_seller;
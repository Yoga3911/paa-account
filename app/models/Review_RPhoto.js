const db = require("../config/db")
const { DataTypes } = require("sequelize");
const Review = require("./Review");
const RPhoto = require("./RPhoto");

const ReviewRPhoto = db.define(
    "review_rphoto",
    {
        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Review,
                key: "review_id"
            },
        },
        rphoto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RPhoto,
                key: "rphoto_id"
            },
        }
    }, {
        timestamps: false
    }
)

module.exports = ReviewRPhoto;

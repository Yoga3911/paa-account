const express = require("express")
const router = express.Router()
// const User = require("../models/User")
// const Admin = require("../models/Admin")
// const Req_to_be_seller = require("../models/Req_to_be_seller")
const Product = require("../models/Product")
const Category = require("../models/Category")
const Review = require("../models/Review")
const RPhoto = require("../models/RPhoto")
const ReviewRPhoto = require("../models/Review_RPhoto")
const Acc_Product = require("../models/Acc_Product")

router.get("/users", async (_, res) => {
    try {
        await User.findAll({
            order: [
                ["user_id", "ASC"]
            ]
        }).then((users) => res.status(200).json({
            status: true,
            message: "Get all user successfully",
            data: users
        }))
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

router.post("/review", async (req, res) => {
    try {
        await Review.create(
            req.body
        ).then((review) => res.status(201).json({
            status: true,
            message: "Insert review successfully",
            data: review
        }))

    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

module.exports = router
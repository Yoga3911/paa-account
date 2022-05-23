const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/User")
const Admin = require("../models/Admin")
const Req_to_be_seller = require("../models/Req_to_be_seller")

router.post("/users/login", async (req, res) => {
    const data = req.body
    try {
        const result = await User.findOne({
            where: {
                email: data.email,
                password: data.password,
            }
        })

        if (result != null) {
            const secret = process.env.JWT_SECRET
            const expire = "1h"
            const data = {
                id: result.user_id,
                username: result.username,
                email: result.email,
                password: result.password,
                address: result.address,
            }

            const token = jwt.sign(data, secret, { algorithm: "HS256", expiresIn: expire })

            res.status(200).json({
                status: true,
                message: "Login berhasil!",
                data: result,
                token: token,
            })
            return;
        }

        res.status(404).json({
            status: false,
            message: "User not found!",
            data: null
        })

    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

module.exports = router
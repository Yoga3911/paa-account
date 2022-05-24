const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const Req_to_be_seller = require("../models/Req_to_be_seller");

router.post("/users/login", async (req, res) => {
  const data = req.body;
  try {
    const result = await User.findOne({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (result != null) {
      const secret = process.env.JWT_SECRET;
      const expire = "1h";
      const data = {
        id: result.user_id,
        username: result.username,
        email: result.email,
        password: result.password,
        address: result.address,
      };

      const token = jwt.sign(data, secret, { algorithm: "HS256", expiresIn: expire });

      res.status(200).json({
        status: true,
        message: "Login berhasil!",
        data: result,
        token: token,
      });
      return;
    }

    res.status(404).json({
      status: false,
      message: "User not found!",
      data: null,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: e,
      data: null,
    });
  }
});

router.post("/users/request", async (req, res) => {
  const data = req.body;
  try {
    await Req_to_be_seller.create({
      user_id: data.user_id,
      shop_address: data.shop_address,
      phone: data.phone,
      shop_image: data.shop_image,
      status: data.status,
      request_date: data.request_date,
      acc_date: data.acc_date,
    }).then((data) =>
      res.status(200).json({
        status: true,
        message: "Permohonan Anda Telah Dikirim",
        data: data,
      })
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: e,
      data: null,
    });
  }
});

router.put("/users/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const selectedUser = await User.findByPk(userId);

    if (selectedUser) {
      selectedUser.set({ ...req.body }).save();

      res.status(200).json({
        status: true,
        message: `User with id ${userId} has been updated`,
        data: selectedUser,
      });
    } else {
      res.status(400).json({
        status: false,
        message: `No such user exists with id ${userId}`,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: null,
    });
    console.log(error);
  }
});

module.exports = router;

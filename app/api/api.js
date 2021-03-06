const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const Req_to_be_seller = require('../models/Req_to_be_seller');
const bcrypt = require('../utils/hash_salt');
const { isLogin } = require("../utils/is_login");

//!! Login - YOGA
router.post('/users/login', async (req, res) => {
  const data = req.body;
  try {
    const result = await User.findOne({
      where: {
        email: data.email,
      }
    });

    if (result == null) {
      res.status(400).json({
        status: false,
        message: 'User tidak ditemukan',
        data: null,
      });
      return;
    }

    const isValid = await bcrypt.comparePassword(data.password, result.password)
    if (!isValid) {
      res.status(400).json({
        status: true,
        message: 'Password salah!',
        data: null,
      });
      return;
    }

    const result2 = await User.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ['password']
      }
    });

    if (result2 != null) {
      const secret = process.env.JWT_SECRET;
      const expire = '1h';
      const data = {
        id: result2.user_id,
        username: result2.username,
        email: result2.email,
        password: result2.password,
        address: result2.address,
      };

      const token = jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: expire });

      res.cookie("access_token_coockie", token, { httpOnly: true, secure: true }).status(200).json({
        status: true,
        message: 'Login berhasil!',
        data: result2,
        token: token,
      });
      return;
    }

  }
  //error dr server
  catch (e) {
    res.status(500).json({
      status: false,
      message: e,
      data: null,
    });
  }
});

//!! Register - BEA
router.post('/users/register', async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: data.email
      }
    })
    if (user == null) {
      const hash = await bcrypt.hashPassword(data.password);
      const result = await User.create({
        username: data.username,
        email: data.email,
        password: hash,
        address: data.address,
        image: data.image,
        is_seller: false,
        is_active: false,
      })
      res.status(201).json({
        status: true,
        message: 'Akun berhasil dibuat',
        data: null,
      });
      return
    }
    //else
    res.status(400).json({
      status: false,
      message: 'Email telah terdaftar, silahkan daftarkan email yang lain',
      data: null
    });

    //error dr server
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
      data: null
    })

  }
})
/////////////////////////////////////////////////////////
//!! Request to be seller
router.post('/users/request', isLogin, async (req, res) => {
  const data = req.body;
  try {
    await Req_to_be_seller.create({
      user_id: data.user_id,
      shop_address: data.shop_address,
      phone: data.phone,
      shop_image: data.shop_image,
      status: false,
      request_date: Date.now(),
    }).then((data) =>
      res.status(200).json({
        status: true,
        message: 'Permohonan Anda Telah Dikirim',
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


//!! Update User
router.put('/users/profile/:userId', isLogin, async (req, res) => {
  try {
    const { userId } = req.params;
    const selectedUser = await User.findByPk(userId);
    delete req.body.user_id;
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
      message: 'Internal Server Error',
      data: null,
    });
    console.log(error);
  }
});

//!! Get User
router.get('/users/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findByPk(userId);

    if (result == null) {
      res.status(400).json({
        status: false,
        message: 'User tidak ditemukan',
        data: result,
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Berhasil',
      data: result,
    });

  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
});

//!! Approve User
router.patch('/users/approve/:requestId', isLogin, async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const adminId = req.body.admin_id;
    const result = await Req_to_be_seller.findByPk(requestId);

    if (result == null) {
      res.status(400).json({
        status: false,
        message: 'Data tidak ditemukan',
        data: result,
      });
      return;
    }

    result.set({
      admin_id: adminId,
      status: true,
      acc_date: Date.now(),
    }).save()

    const user = await User.findByPk(result.user_id)
    user.set({
      is_seller: true
    }).save()

    res.status(200).json({
      status: true,
      message: 'Berhasil',
      data: result,
    });

  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
});

module.exports = router;

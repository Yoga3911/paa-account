const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const Req_to_be_seller = require('../models/Req_to_be_seller');

//!! Login - YOGA
router.post('/users/login', async (req, res) => {
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
      const expire = '1h';
      const data = {
        id: result.user_id,
        username: result.username,
        email: result.email,
        password: result.password,
        address: result.address,
      };

      const token = jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: expire });

      res.status(200).json({
        status: true,
        message: 'Login berhasil!',
        data: result,
        token: token,
      });
      return;
    }
    //else
    res.status(404).json({
      status: false,
      message: 'Email atau Password salah',
      data: null,
    });
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
      const result = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        address: data.address,
        image: data.image,
        is_seller: false,
        is_active: false,

      })
      res.status(201).json({
        status: true,
        message: 'Akun berhasil dibuat',
        data: result
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
router.post('/users/request', async (req, res) => {
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
router.put('/users/profile/:userId', async (req, res) => {
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
      res.status(404).json({
        status: true,
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
router.patch('/users/approve/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const result = await Req_to_be_seller.findByPk(requestId);

    if (result == null) {
      res.status(404).json({
        status: false,
        message: 'Data tidak ditemukan',
        data: result,
      });
      return;
    }

    result.set({
      status: true
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

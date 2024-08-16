const express = require('express');
const { userLogin } = require('../controllers/authController.js');

const authRoutes = express.Router();

authRoutes.post('/user/login', userLogin);

module.exports = { authRoutes };

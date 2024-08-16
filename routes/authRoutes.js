const express = require("express");
const { userLogin, userRegister } = require("../controllers/authController.js");

const authRoutes = express.Router();

authRoutes.post("/api/user/signin", userLogin);
authRoutes.post("/api/user/signup", userRegister);

module.exports = { authRoutes };

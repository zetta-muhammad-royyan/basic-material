import express from "express";
import { userLogin } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/user/login", userLogin);

export { authRoutes };

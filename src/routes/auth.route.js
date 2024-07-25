import express from "express";
import authController from "../app/controllers/AuthController.js";

const router = express.Router();


router.post('/register', authController.register); // localhost:3000/auth/register
router.post('/login', authController.login); // localhost:3000/auth/login
router.post('/logout', authController.logout);  // localhost:3000/auth/logout

export default router;
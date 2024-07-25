import express from "express";
import userController from "../app/controllers/UserController.js";

const router = express.Router();

router.use('/register', userController.register);
router.use('/login', userController.login);

export default router;
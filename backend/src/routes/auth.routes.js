import express from "express";
import {
  register,
  verifyEmail,
  login,
  googleAuth,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/google", googleAuth);
router.get("/me", protect, getMe);

export default router;

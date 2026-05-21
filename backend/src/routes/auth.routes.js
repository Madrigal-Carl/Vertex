import express from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.get("/verify-email/:token", verifyEmail);

export default router;

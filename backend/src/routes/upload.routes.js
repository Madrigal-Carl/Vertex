import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadImages } from "../controllers/upload.controller.js";
import { authenticated, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/images",
    authenticated,
    allowRoles("admin"),
    upload.array("images", 10), // max 10 images per request
    uploadImages
);

export default router;
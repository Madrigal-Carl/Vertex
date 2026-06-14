import { uploadToCloudinary } from "../services/upload.service.js";

export const uploadImages = async (
    req,
    res
) => {
    try {
        if (!req.files || !req.files.length) {
            return res.status(400).json({
                message: "No images provided",
            });
        }

        const uploadedImages =
            await Promise.all(
                req.files.map((file) =>
                    uploadToCloudinary(file)
                )
            );

        return res.json({
            images: uploadedImages,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Image upload failed",
            error: error.message,
        });
    }
};
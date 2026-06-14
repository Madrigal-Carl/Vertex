import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream =
            cloudinary.uploader.upload_stream(
                {
                    folder: "products",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) return reject(error);

                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);
    });
};
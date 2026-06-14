import multer from "multer";

const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
];

export const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per image
    },

    fileFilter: (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Only PNG, JPG, JPEG images are allowed"
                )
            );
        }

        cb(null, true);
    },
});
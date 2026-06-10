import { categorySchema } from "../schemas/category.schema.js";

export const validateCategory = (req, res, next) => {
    const result = categorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: result.error.issues,
        });
    }

    req.body = result.data;
    next();
};
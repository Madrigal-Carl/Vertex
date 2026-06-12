import { createProductSchema } from "../schemas/product.schema.js";

export const validateCreateProduct = (
    req,
    res,
    next,
) => {
    const result = createProductSchema.safeParse(
        req.body,
    );

    if (!result.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: result.error.issues,
        });
    }

    req.body = result.data;

    next();
};
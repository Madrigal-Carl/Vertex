import { createOrderSchema } from "../schemas/order.schema.js";

export const validateCreateOrder = (req, res, next) => {
  const result = createOrderSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.issues,
    });
  }

  req.body = result.data;

  next();
};

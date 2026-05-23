import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

export const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.issues,
    });
  }

  req.body = result.data;
  next();
};

export const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.issues,
    });
  }

  req.body = result.data;

  next();
};

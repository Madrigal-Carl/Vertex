import { asyncHandler } from "../utils/asyncHandler.js";
import { createOrder } from "../services/order.service.js";

export const create = asyncHandler(async (req, res) => {
  const order = await createOrder({
    userId: req.user._id,
    email: req.user.email,
    idempotencyKey: req.headers["idempotency-key"],
    ...req.body,
  });

  return res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});

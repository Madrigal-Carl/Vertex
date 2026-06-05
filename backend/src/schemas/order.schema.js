import { z } from "zod";

export const createOrderSchema = z.object({
  deliveryMethod: z.enum(["pickup", "delivery"]),
  paymentMethod: z.enum(["cod", "e-wallet"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must contain at least one item"),
});

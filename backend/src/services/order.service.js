import redis from "../config/redis.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Variant from "../models/variant.model.js";
import Inventory from "../models/inventory.model.js";
import emailQueue from "../queues/email.queue.js";
import { EMAIL_JOBS } from "../queues/email.jobs.js";

export const createOrder = async ({
  userId,
  email,
  idempotencyKey,
  deliveryMethod,
  paymentMethod,
  items,
}) => {
  if (!idempotencyKey) {
    throw new Error("Missing Idempotency-Key header");
  }

  const redisKey = `order:idempotency:${userId}:${idempotencyKey}`;
  const lockKey = `order:lock:${userId}:${idempotencyKey}`;

  const existingOrderId = await redis.get(redisKey);

  if (existingOrderId) {
    return await Order.findById(existingOrderId);
  }

  const acquired = await redis.set(lockKey, "processing", "EX", 30, "NX");

  if (!acquired) {
    throw new Error("Order is already being processed");
  }

  try {
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      const variant = await Variant.findById(item.variantId);

      if (!variant) {
        throw new Error("Variant not found");
      }

      if (variant.productId.toString() !== product._id.toString()) {
        throw new Error("Variant does not belong to product");
      }

      const availableStock = await Inventory.countDocuments({
        variantId: variant._id,
        status: "available",
      });

      if (availableStock < item.quantity) {
        throw new Error(
          `${product.name} only has ${availableStock} item(s) available`,
        );
      }

      const price = product.getDiscountedPrice(variant.price);

      const lineTotal = price * item.quantity;

      subtotal += lineTotal;

      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        quantity: item.quantity,

        name: product.name,
        sku: variant.sku,
        price,
      });
    }

    const shippingFee = deliveryMethod === "delivery" ? 160 : 0;
    const totalAmount = subtotal + shippingFee;
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create({
      userId,
      orderNumber,
      deliveryMethod,
      paymentMethod,
      items: orderItems,
      subtotal,
      shippingFee,
      totalAmount,
    });

    await emailQueue.add("order-submitted", {
      type: EMAIL_JOBS.ORDER_SUBMITTED,
      data: {
        to: email,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
      },
    });

    await redis.set(
      redisKey,
      order._id.toString(),
      "EX",
      60 * 60 * 24,
    );

    return order;

  } finally {
    await redis.del(lockKey);
  }
};

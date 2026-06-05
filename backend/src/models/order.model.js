import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    deliveryMethod: {
      type: String,
      enum: ["pickup", "delivery"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "e-wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "partial", "refunded"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "ready for pickup",
        "out for delivery",
        "received",
        "cancelled",
      ],
      default: "pending",
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        variantId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        name: String,
        sku: String,
        price: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);

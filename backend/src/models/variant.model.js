import mongoose from "mongoose";

import Inventory from "./inventory.model.js";

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    attributes: {
      type: Map,
      of: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

// =====================
// METHODS
// =====================

variantSchema.methods.getAvailableStock = async function () {
  return Inventory.countDocuments({
    variantId: this._id,
    status: "available",
  });
};

variantSchema.statics.findByProductWithStock = async function (productId) {
  const variants = await this.find({ productId }).lean();

  const variantIds = variants.map((v) => v._id);

  const stocks = await Inventory.aggregate([
    {
      $match: {
        variantId: { $in: variantIds },
        status: "available",
      },
    },
    {
      $group: {
        _id: "$variantId",
        stock: { $sum: 1 },
      },
    },
  ]);

  const stockMap = new Map(stocks.map((s) => [s._id.toString(), s.stock]));

  return variants.map((variant) => ({
    ...variant,
    stock: stockMap.get(variant._id.toString()) || 0,
  }));
};

export default mongoose.model("Variant", variantSchema);

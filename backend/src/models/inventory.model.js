import { tr } from "@faker-js/faker";
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    serialNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Inventory", inventorySchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        sku: String,
        attributes: {
          color: String,
          size: String,
        },
        price: {
          original: {
            type: Number,
            required: true,
          },
          discounted: {
            type: Number,
            default: null,
          },
        },
      },
    ],
    images: [
      {
        url: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);

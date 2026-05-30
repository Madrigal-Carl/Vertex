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
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    images: [
      {
        _id: false,
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

// =====================
// METHODS
// =====================

productSchema.methods.hasDiscount = function () {
  return this.discount > 0;
};

productSchema.methods.getDiscountedPrice = function (price) {
  if (!this.hasDiscount()) {
    return price;
  }

  return Math.round(price * (1 - this.discount / 100));
};

// =====================
// VIRTUALS
// =====================

productSchema.virtual("categoryName", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Product", productSchema);

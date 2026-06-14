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
    images: [
      {
        _id: false,
        publicId: String,
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

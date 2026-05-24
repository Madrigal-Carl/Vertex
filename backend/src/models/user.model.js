import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    googleId: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "technician", "cashier"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

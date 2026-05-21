import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    rememberMe: {
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

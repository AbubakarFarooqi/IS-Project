import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userDataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    important:{
      type: Boolean,
      require: false,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export const UserData = mongoose.model("UserData", userDataSchema);
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
  },
  {
    timestamps: true,
  }
);

userDataSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userDataSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserData = mongoose.model("UserData", userDataSchema);

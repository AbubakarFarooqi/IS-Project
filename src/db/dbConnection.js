import mongoose from "mongoose";
import dotenv from "dotenv";
import ApiError from "../utilis/ApiError";

dotenv.config();
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );
  } catch (error) {
    throw new ApiError(401, "Database Connection Failed");
  }
};

export default connectDb;

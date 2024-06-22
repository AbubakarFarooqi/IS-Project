import mongoose from "mongoose";
import dotenv from "dotenv";
import ApiError from "../utilis/ApiError";

dotenv.config();
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      //`${process.env.DB_URL}`
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `Database Connected At HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    throw new ApiError(401, "Database Connection Failed");
  }
};

export default connectDb;

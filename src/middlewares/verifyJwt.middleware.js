import ApiError from "../utilis/ApiError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJwt = (req, _, next) => {
  try {
    const incommingToken =
      req.cookies?.accessToken.toString() ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(incommingToken);
    if (!incommingToken) {
      throw new ApiError(401, "Token not found");
    }

    const verifiedToken = jwt.verify(
      incommingToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!verifiedToken) {
      throw new ApiError(401, "InvalidToken");
    }

    req.userId = verifiedToken._id;
    console.log(verifiedToken._id);
    console.log(req.userId);

    next();
  } catch (error) {
    throw new ApiError(500, "Error in verifying token: ", error.message);
  }
};

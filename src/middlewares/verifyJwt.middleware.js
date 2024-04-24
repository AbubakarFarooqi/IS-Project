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
    console.log("azan ali far")
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

    const user = {
      _id: verifiedToken._id,
      name: verifiedToken.name,
      email: verifiedToken.email,
    };
    req.user = user;
    console.log(req.user);

    next();
  } catch (error) {
    throw new ApiError(500, "Error in verifying token: ", error.message);
  }
};

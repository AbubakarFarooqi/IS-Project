import { UserData } from "../models/userData.models.js";
import ApiError from "../utilis/ApiError.js";
import ApiResponse from "../utilis/ApiResponse.js";
import asyncHandler from "../utilis/asyncHandler.js";

const addUserData = asyncHandler(async (req, res) => {
  const { accountName, email, password } = req.body;

  if (!(accountName || email || password)) {
    throw new ApiError(401, "All fields are required");
  }

  // user id
  console.log("azan ", req.userId);
  const userId = req.userId;

  const createdEntry = await UserData.create({
    userId,
    accountName,
    password,
    email,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        email: email,
        accountName: accountName,
      },
      "Data has been saved"
    )
  );
});

export { addUserData };
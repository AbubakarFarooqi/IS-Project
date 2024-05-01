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
  console.log("azan ", req.user._id);
  const userId = req.user._id;

  const createdEntry = await UserData.create({
    userId,
    accountName,
    password,
    email,
  });

  return res.status(200).json(
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

const updateUserData = asyncHandler(async (req, res) => {
  const { _id, accountName, email, password } = req.body;

  if (!(accountName || email || password || _id)) {
    throw new ApiError(401, "Provide Some information");
  }

  const userId = req.user._id;

  const userDataInstance = await UserData.findById(_id);

  if (!userDataInstance) {
    throw new ApiError(401, "Account not found");
  }

  var isAnyFieldChanged = false;

  if (userDataInstance.email !== email) {
    userDataInstance.email = email;
    isAnyFieldChanged = true;
  }

  if (!userDataInstance.isCorrectPassword(password)) {
    userDataInstance.password = password;
    isAnyFieldChanged = true;
  }

  if (userDataInstance.accountName !== accountName) {
    userDataInstance.accountName = accountName;
    isAnyFieldChanged = true;
  }

  if (isAnyFieldChanged) {
    await userDataInstance.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userDataInstance, "User data updated"));
});

const getUserData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userData = await UserData.find({ userId: userId });

  if (!userData) {
    throw new ApiError(401, "No data found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "user data fetched successfully"));
});

const changeFavourite = asyncHandler(async (req, res) => {
  const userId = req.body._id;
  const userData = await UserData.find({ userId: userId });
  var isAnyFieldChanged = false;

  if (!userData) {
    throw new ApiError(401, "No data found");
  }
  else{
    if(userData.important === false)
    {
      userData.important = true;
      isAnyFieldChanged = true;
    }
    else{
      userData.important = false;
      isAnyFieldChanged = true;
    }
  }

  if (isAnyFieldChanged) {
    await userDataInstance.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userDataInstance, "User data updated"));
});


export { addUserData, updateUserData, getUserData, changeFavourite };


import ApiError from "../utilis/ApiError.js";
import ApiResponse from "../utilis/ApiResponse.js";
import asyncHandler from "../utilis/asyncHandler.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    throw new ApiError(401, "userController :Provide All user information");
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    console.log("User does not exist")
    throw new ApiError(401, "userController :User already Registered");
  }
  await User.create({
    name: name,
    email: email,
    password: password,
  });

  const createdUser = await User.findOne({ email }).select("-password");
  
  if (!createdUser) {
    throw new ApiError(500, "userController :Error in creating user");
  }
  console.log("User Is stored in DB")
  const accessToken = await createdUser.generateAccessToken();

  console.log("This is Access token of registered User"+accessToken);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, createdUser, "User has been registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Email is not correct");
  }

  const isValidPassword = await user.isCorrectPassword(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Password is not correct");
  }

  const accessToken = await user.generateAccessToken();

  console.log("This access token is generated in logging in User un Login FUnction of user.controller file"+accessToken);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };

  return res
  .status(200)
  .header('Access-Control-Allow-Credentials', true)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          email: user.email,
          name: user.name
        },
        "user loged in"
      )
    );
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  if (!name && !oldPassword && !newPassword) {
    throw new ApiError(401, "userController :No field is given");
  }
  const userId = req.user._id;
  const user = await User.findById(userId);

  console.log(user);

  if (oldPassword || newPassword) {
    if (!(await user.isCorrectPassword(oldPassword))) {
      throw new ApiError(401, "userController :Password is not correct");
    }
    user.password = newPassword;
  }

  if (name !== user.name) {
    user.name = name;
  }

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Data has been updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("In get current user function");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user returned successfully"));
});

export { registerUser, loginUser, updateUser, getCurrentUser };

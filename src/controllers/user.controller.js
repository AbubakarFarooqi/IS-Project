import ApiError from "../utilis/ApiError.js";
import ApiResponse from "../utilis/ApiResponse.js";
import asyncHandler from "../utilis/asyncHandler.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    throw new ApiError(401, "userController :Provide All user information");
  }
  console.log("1");
  const isUserExist = await User.findOne({ email });
  console.log("1");

  if (isUserExist) {
    throw new ApiError(401, "userController :User already Registered");
  }
  console.log("1");
  await User.create({
    name: name,
    email: email,
    password: password,
  });
  console.log("2");

  const createdUser = await User.findOne({ email }).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "userController :Error in creating user");
  }

  return res
    .status(200)
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

  console.log(accessToken);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          email: user.email,
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

  res.status(200).json(new ApiResponse(200, user, "Data has been updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res
    .status(200)
    .json(new ApiResponse(200, user, "Current user returned successfully"));
});

export { registerUser, loginUser, updateUser, getCurrentUser };

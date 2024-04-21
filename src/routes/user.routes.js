import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/update").post(verifyJwt, updateUser);
userRouter.route("/current-user").get(verifyJwt, getCurrentUser);

//secure route

export default userRouter;

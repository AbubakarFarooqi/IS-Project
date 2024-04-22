import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import {
  addUserData,
  changeFavourite,
  getUserData,
  updateUserData,
} from "../controllers/userData.controller.js";
const userDataRouter = Router();

userDataRouter.route("/add-data").post(verifyJwt, addUserData);
userDataRouter.route("/update-data").post(verifyJwt, updateUserData);
userDataRouter.route("/get-data").get(verifyJwt, getUserData);
userDataRouter.route("/changefavourite").get(verifyJwt, changeFavourite);

export default userDataRouter;

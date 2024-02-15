import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { addUserData } from "../controllers/userData.controller.js";
const userDataRouter = Router();

userDataRouter.route("/add-data").post(verifyJwt, addUserData);

export default userDataRouter;

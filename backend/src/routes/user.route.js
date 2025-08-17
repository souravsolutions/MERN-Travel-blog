import { Router } from "express"
import validate from "../middlewares/validate-middleware.js"
import { loginUserSchema, registerUserSchema } from "../validators/auth-validator.js";
import { getUser, loginUser, signUp } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const userRouter = Router();

userRouter.route("/signup").post(validate(registerUserSchema), signUp)
userRouter.route("/login").post(validate(loginUserSchema), loginUser)

userRouter.route("/me").get(authMiddleware, getUser)

export default userRouter
import { Router } from "express";
import * as userServices from './user.services.js';
import { auth } from "../../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", userServices.signUp)
userRouter.post("/login", userServices.login)
userRouter.patch("/update",auth, userServices.update)
userRouter.delete("/delete",auth, userServices.deleted)
userRouter.get("/",auth, userServices.getById)


export default userRouter
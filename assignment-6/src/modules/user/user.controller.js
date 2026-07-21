
import { Router } from "express";
import * as userService from './user.services.js';

const userRouter = Router();

userRouter.post("/signup",userService.signup);
userRouter.put("/:id",userService.createOrInsert);
userRouter.get("/email",userService.getUserByEmail);
userRouter.get("/:id",userService.getUserById);

export default userRouter;
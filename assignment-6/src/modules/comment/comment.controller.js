import {Router} from "express";
import * as commentServices from "../comment/comment.services.js";

const commentRouter = Router();

commentRouter.post("/putComment",commentServices.postComment)
commentRouter.patch("/updateCommentById/:id",commentServices.updateCommentById)
commentRouter.post("/findOrCreateComment",commentServices.findOrCreateComment)
commentRouter.get("/findByWord",commentServices.findByWord)
commentRouter.get("/getNewestComments/:postId",commentServices.getNewestComments)
commentRouter.get("/getCommentByPKwithUserandPost/:commentId",commentServices.getCommentByPKwithUserandPost)



export default commentRouter
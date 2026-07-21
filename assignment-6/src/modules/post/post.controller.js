
import {Router} from "express";
import * as postServices from "../post/post.services.js";


const postRouter = Router();


postRouter.post("/addPost",postServices.newPost)
postRouter.delete("/deletePost/:postId",postServices.deletePost);
postRouter.get("/detailsPost",postServices.getAllPosts);
postRouter.get("/comment-count",postServices.getPostsWithCommentCount);

export default postRouter

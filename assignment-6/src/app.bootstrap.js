import express from 'express';
import { connectionDB, SyncDB } from './connection/connectionDB.js';
import "./models/userModel.js";
const app = express();
const port = 3000;
import User from './models/userModel.js';
import postModel from './models/postModel.js';
import Comment from './models/commentModel.js';
import "./models/relation.js";
import userRouter from './modules/user/user.controller.js';
import postRouter from './modules/post/post.controller.js';
import commentRouter from './modules/comment/comment.controller.js';

const bootstrap = () => {

    app.use(express.json());
    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Hello in my assignment 6" });
    })


    connectionDB()
    SyncDB()
    app.use("/users", userRouter);
    app.use("/posts",postRouter);
    app.use("/comment",commentRouter)



    app.use('{/*demo}', (req, res, next) => {
        return res.status(404).json({ message: "Not Found this Url" });
    })

    app.listen(port, () => {
        console.log("App Run Successful with port : ", port);

    })

}

export default bootstrap

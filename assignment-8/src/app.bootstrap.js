import express from "express"
import connectionDB from "../DB/connectionDB.js";
import userModel from "../models/user.model.js";
import userRouter from "../modules/users/user.controller.js";
import noteRouter from "../modules/notes/note.controller.js";
const app = express();
const Port = 3000;

const appBootStrap = async () => {


    app.use(express.json());

    await connectionDB()
    userModel()
    app.use("/users", userRouter)
    app.use("/notes", noteRouter)

    app.get("/", (req, res) => {
        return res.status(201).json({ message: "App With Mongoos Work Successfuly" });
    })

    app.use("{/*demo}", (req, res) => {
        return res.status(404).json({ message: "Not Found this Url" });
    })

    app.listen(Port, () => {
        return console.log(`app work on port : ${Port} successfuly`);
    })

}

export default appBootStrap
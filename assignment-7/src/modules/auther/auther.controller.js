
import {Router} from "express";
import * as autherServices from "../auther/auther.services.js";

const autherRouter = Router()


autherRouter.post("/authers",autherServices.createAuther)



export default autherRouter
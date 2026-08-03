
import {Router} from "express";
import * as logServices from "./log.services.js";

const logRouter = Router()


logRouter.post("/collection/logs/capped",logServices.logConnectionCapped)
logRouter.post("/logs",logServices.insertLog)



export default logRouter
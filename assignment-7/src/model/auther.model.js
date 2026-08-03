import { db } from "../DB/connectionDB.js";

export const autherConnection = await db.collection("authors");
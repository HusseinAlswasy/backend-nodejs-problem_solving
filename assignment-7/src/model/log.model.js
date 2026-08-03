import { db } from "../DB/connectionDB.js";

export const logCollection = db.collection("logs");

export const createConnection = async () => {
    return await db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    });
}

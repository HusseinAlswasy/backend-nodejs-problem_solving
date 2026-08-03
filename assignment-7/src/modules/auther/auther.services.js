import { autherConnection } from "../../model/auther.model.js";

export const createAuther = async (req, res) => {
    try {
        const {name,nationality} = req.body;
        const newAuther = autherConnection.insertOne({name,nationality});
        res.status(201).json({ message: "Inserted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error Inserted Auther", error: error.message });
    }
}


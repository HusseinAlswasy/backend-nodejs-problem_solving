import { createConnection ,logCollection} from "../../model/log.model.js";

export const logConnectionCapped = async (req, res) => {
    try {
        await createConnection();
        return res.status(201).json({ message: "Log collection created successfully" });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const insertLog = async (req, res) => {
    try {
        const data = req.body;
        const log = await logCollection
        const result = await log.insertOne(data);
        return res.status(201).json({ message: "Log inserted successfully", result });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
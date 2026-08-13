import jwt from "jsonwebtoken"; // to check token

export const auth = (req, res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];  // to get token like this Bearer eyJhbGciOiJIUzI1Ni...
        if (!token) {
            return res.status(401).json({ message: "Token required" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // to check token 
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Invalid Token" });
    }
}
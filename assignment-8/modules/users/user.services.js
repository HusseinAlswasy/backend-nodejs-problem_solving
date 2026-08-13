import userModel from "../../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signUp = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;
        const emailExist = await userModel.findOne({ email: email });
        if (emailExist) {
            return res.status(409).json({ message: "Email Already Exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            age
        })

        return res.status(201).json({ message: "New User Added Successfuly" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({ message: "Login Successfuly", token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { name, email, phone, age } = req.body;
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User Not Founded" });
        }

        if (email !== undefined) {
            if (email !== user.email) {
                const emailExist = await userModel.findOne({ email });
                if (emailExist) {
                    return res.status(409).json({
                        message: "Email already exists."
                    });
                }
            }
        }

        const userUpdated = await userModel.findByIdAndUpdate(req.userId, { name, email, phone, age }, { runValidators: true, new: true });

        return res.status(200).json({ message: "User Updated", userUpdated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleted = async (req, res) => {
    try {

        const user = await userModel.findByIdAndDelete(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getById = async (req, res) => {
    try {

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User Founded",user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



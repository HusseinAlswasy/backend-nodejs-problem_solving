import userModel from "../../models/userModel.js";

//======================================Sign Up======================================
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const isEmailExist = await userModel.findOne({
            where: { email }
        })

        if (isEmailExist) {
            return res.status(404).json({ message: "Email already exists." })
        }

        const user = userModel.build({
            name, email, password, role
        })

        await user.save();

        return res.status(201).json({
            message: "User added successfully."
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};
//======================================Create Or Insert======================================

export const createOrInsert = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const { id } = req.params;

        await userModel.upsert({
            id, name, email, password, role

        }, {
            validate: false,
        });

        res.status(200).json({ message: "user created or uppdated successfuly" });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//======================================Get User By Email======================================
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        const user = await userModel.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(404).json({ message: "Email Not exists." })
        }


        return res.status(200).json({
            message: "User founded", user
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

//======================================Get By Id======================================
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findByPk(id, {
            attributes: { exclude: ["role"] }
        })
        if (!user) {
            return res.status(404).json({
                message: "no user found"
            });
        }

        return res.status(200).json({
            message: "User founded", user
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};



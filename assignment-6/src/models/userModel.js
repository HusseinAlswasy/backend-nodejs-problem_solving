import { sequelize } from "../connection/connectionDB.js";
import { Sequelize, DataTypes  } from "sequelize";



const userModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error("Password must be more than 6 characters");
                }
            }
        },
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin']
    },

}, {
    hooks: {
        beforeCreate(user) {
            if (user.name.length <= 2) {
                throw new Error("Name must be more than 2 characters");
            }
        }


    }
},)

export default userModel;
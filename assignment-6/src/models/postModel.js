import { sequelize } from "../connection/connectionDB.js";
import { Sequelize, DataTypes, Model } from "sequelize";

class postModel extends Model {}


postModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Post",
    timestamps: true,
    paranoid: true
})

export default postModel;
import { sequelize } from "../connection/connectionDB.js";
import { Sequelize, DataTypes, Model } from "sequelize";

class Comment extends Model { }


Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Comment",
    timestamps: true,
})

export default Comment;
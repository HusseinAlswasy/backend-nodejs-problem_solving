import { Op } from "sequelize";
import Comment from "../../models/commentModel.js";
import { User } from "../../models/relation.js";
import postModel from "../../models/postModel.js";
import userModel from "../../models/userModel.js";

export const postComment = async (req, res, next) => {
    try {
        const { comments } = req.body;

        await Comment.bulkCreate(comments);

        return res.status(200).json({ message: "comment created" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updateCommentById = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const { content, userId } = req.body;

        const commentFound = await Comment.findByPk(commentId);

        if (!commentFound) {
            return res.status(404).json({
                message: "comment not found."
            });
        }
        if (commentFound.id != userId) {
            return res.status(403).json({
                message: "You are not authorized to update this comment."
            });
        }
        commentFound.content = content;
        await commentFound.save();
        return res.status(200).json({ message: "comment updated" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const findOrCreateComment = async (req, res, next) => {
    try {
        const { content, userId, postId } = req.body;

        const [comment, created] = await Comment.findOrCreate({
            where: {
                content,
                userId,
                postId
            },

            defaults: {
                content,
                userId,
                postId
            }
        });

        return res.status(200).json({
            comment,
            created
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const findByWord = async (req, res, next) => {
    try {
        const { word } = req.query;

        const comments = await Comment.findAll({
            where: {
                content: {
                    [Op.like]: `%${word}`
                }
            }
        });

        if (comments.length === 0) {
            return res.status(404).json({
                message: "no comments found."
            });
        }

        return res.status(200).json({
            count: comments.length,
            comments
        });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}

export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: {
                postId
            },
            attributes: ["id", "content", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 3
        });

        return res.status(200).json({
            comments
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getCommentByPKwithUserandPost = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const commentFound = await Comment.findByPk(commentId, {
            attributes: ["id", "content"],
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: postModel,
                    attributes: ["id", "title", "content"]

                }
            ]
        });

        if (!commentFound) {
            return res.status(404).json({
                message: "comment not found."
            });
        }

        return res.status(200).json({commentFound});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

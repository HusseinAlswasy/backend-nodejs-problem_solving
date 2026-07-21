
import postModel from "../../models/postModel.js";
import { User } from "../../models/relation.js";
import {Comment} from "../../models/relation.js";
import { fn, col } from "sequelize";

export const newPost = async (req, res, next) => {
    try {
        const { title, content, userId } = req.body;

        const addPost = postModel.build({
            title, content, userId
        })

        await addPost.save();

        return res.status(200).json({ message: "Post Added Successfuly" });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { postId } = req.params;

        const isPostFounded = await postModel.findByPk(postId);

        if (!isPostFounded) {
            return res.status(404).json({ message: "Post Not Founded" });
        }

        if (isPostFounded.userId != userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post." });

        }

        await isPostFounded.destroy();

        return res.status(200).json({
            message: "Post deleted."
        });

    } catch (error) {
        res.status(405).json({ message: error.message });
    }

}

export const getAllPosts = async (req, res, next) => {
    try {

        const posts = await postModel.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: User,
                    attributes: ["id", "name"],
                },
                {
                    model: Comment,
                    attributes: ["id", "content"],

                }
            ]
        })
        return res.status(200).json({
            message: "Post Get Successfuly.", posts
        });

    } catch (error) {
        res.status(405).json({ message: error.message });
    }

}

export const getPostsWithCommentCount = async (req, res, next) => {
    try {
        const posts = await postModel.findAll({
            attributes: [
                "id",
                "title",
                [fn("COUNT", col("Comments.id")), "commentCount"]
            ],

            include: [
                {
                    model: Comment,
                    attributes: [],
                }
            ],
            group: ["Post.id"]
        })

        return res.status(200).json({
            message: "Posts fetched successfully.",
            posts
        });

    } catch (error) {
        res.status(405).json({ message: error.message });
    }

}


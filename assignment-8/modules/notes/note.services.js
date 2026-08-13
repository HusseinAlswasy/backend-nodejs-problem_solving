import mongoose from "mongoose";
import noteModel from "../../models/note.model.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await noteModel.create({ title, content, userId: req.userId });

        res.status(201).json({ message: "Note Created Successfuly", note });
    } catch (error) {
        res.status(404).json({ message: "Note Created Failed", error: error.message });

    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { noteId } = req.params;

        const noteExist = await noteModel.findById(noteId);

        if (!noteExist) {
            return res.status(404).json({ message: "Note Not Exist" });
        }
        if (noteExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                message: "You are not the owner"
            });
        }

        const note = await noteModel.findOneAndUpdate(
            { _id: noteId },
            { title, content },
            { new: true, runValidators: true });

        res.status(200).json({ message: "Note Updated Successfuly", note });
    } catch (error) {
        res.status(500).json({ message: "Note Updated Failed", error: error.message });
    }
}

export const replaceNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { noteId } = req.params;

        const noteExist = await noteModel.findById(noteId);

        if (!noteExist) {
            return res.status(404).json({ message: "Note Not Exist" });
        }

        if (noteExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                message: "You are not the owner"
            });
        }

        const note = await noteModel.findOneAndUpdate(
            { _id: noteId },
            { title, content },
            { new: true, runValidators: true });

        res.status(200).json({ message: "Note replaced Successfuly", note });
    } catch (error) {
        res.status(500).json({ message: "Note replaced Failed", error: error.message });
    }
}

export const editAllNoteToUserSpecefied = async (req, res) => {
    try {
        const { newTitle } = req.body;

        const updateTitle = await noteModel.updateMany({ userId: req.userId }, { $set: { title: newTitle } }, { runValidators: true });

        if (updateTitle.matchedCount === 0) {
            return res.status(404).json({
                message: "No note found"
            });
        }

        return res.status(200).json({
            message: "All notes updated"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const deleteNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;

        const noteExist = await noteModel.findById(noteId);

        if (!noteExist) {
            return res.status(404).json({ message: "This Note Not Exist" });
        }

        if (noteExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                message: "You are not the owner"
            });
        }

        const deleteNote = await noteModel.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note Deleted Successfuly", deleteNote });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const retrivePaginateNote = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 3;
        const page = Number(req.query.page) || 1;

        const skip = (page - 1) * limit;

        const notes = await noteModel.find({ userId: req.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        return res.status(200).json({
            notes
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;

        const noteExist = await noteModel.findById(noteId);

        if (!noteExist) {
            return res.status(404).json({ message: "Note Not Exist" });
        }

        if (noteExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "Not Autherized On This Note" });
        }

        return res.status(200).json({ message: "Note Geted Successfuly", noteExist });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getContentById = async (req, res) => {
    try {
        const { content } = req.query;

        const noteExist = await noteModel.findOne({
            content,
            userId: req.userId,
        });

        if (!noteExist) {
            return res.status(404).json({ message: "Note Not Exist" });
        }

        return res.status(200).json({ message: "Note Geted Successfuly", noteExist });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getAllNote = async (req, res) => {
    try {
        const notes = await noteModel
            .find({ userId: req.userId })
            .select("title userId content createdAt")
            .populate("userId", "email");

        return res.status(200).json({ notes });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getNoteWithAgg = async (req, res) => {
    try {
        const { title } = req.query;

        const match = {
            userId: new mongoose.Types.ObjectId(req.userId)
        };

        if (title) {
            match.title = title;
        }

        const notes = await noteModel.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    title: 1,
                    userId: 1,
                    createdAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]);

        return res.status(200).json({ notes });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const deleteAllNotes = async (req, res) => {
    try {
        await noteModel.deleteMany({
            userId: req.userId
        });

        return res.status(200).json({
            message: "Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
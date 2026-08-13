import mongoose from "mongoose";
const { Schema, model, models } = mongoose;


const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 10,
            trim: true,
            validate: {
                validator(value) {
                    return value !== value.toUpperCase();
                },
                message: "Title must not be uppercase",
            },
        },
        content: { type: String, required: true, trim: true },
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const noteModel = models.Note || model('Note', noteSchema)

export default noteModel
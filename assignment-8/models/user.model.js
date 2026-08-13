import mongoose from "mongoose";

const {Schema,model,models} = mongoose;


const userSchema = new Schema(
    {
        name: { type: String, required: true, minLength: 3, maxLength: 10, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        age: { type: Number, required: true,min:18,max:60 },
    },
    {
        timestamps: true,
    }
);

const userModel = models.User || model('User',userSchema)

export default userModel
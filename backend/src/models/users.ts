import { InferSchemaType, Schema, model } from "mongoose";
/**mongoose schema for user obj with properties */
const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true,  select: false},
    password: { type: String, required: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema)
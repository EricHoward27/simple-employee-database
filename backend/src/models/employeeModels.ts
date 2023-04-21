import { InferSchemaType, model, Schema } from "mongoose";

const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    department: { type: String },
    position: { type: String, required: true },
    email: { type: String },
    phone: { type: Number },
    birthday: { type: String, required: true },
    location: { type: String },
    homeAddress: { type: String, required: true },
    hireOn: { type: String },
    hours: { type: String },
}, {timestamps: true });

type employee = InferSchemaType<typeof employeeSchema>;

export default model<employee>('employee', employeeSchema);
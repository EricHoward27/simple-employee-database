import mongoose from "mongoose";
/**declare a module for express-session to store user ID with the sesson data for ts */
declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}
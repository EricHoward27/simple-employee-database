import { RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/users"
import bcrypt from "bcrypt"

export const getAuthenticatedUser: RequestHandler =async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}
interface SignUpBody {
    username?: string,
    email?: string, 
    password?: string,
}
/**request handler type name signUp async func extract the values from the req to be used when creating a new user */
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> =async (req,res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        /**checks if username, email or password are missing then it will throw a error 400 */
        if(!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }
        /**check if already a user with username if so then it will throw a error 409 */
        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if(existingUsername) {
            throw createHttpError(409, "Username is already taken. Please choose a different one or log in instead.");
        }
        /**check if already a user with email if so then it will throw a error 409 */
        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }
        /**use bcrypt to hashed the user password for security  */
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);
        /**create the new user and store the properies; use the hashed password not the raw */
        const newUser = await UserModel.create({
            username: username, 
            email: email,
            password: passwordHashed,
        });
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
    
};

interface LoginBody {
    username?: string,
    password?: string,

}

export const login: RequestHandler <unknown, unknown, LoginBody, unknown> =async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }
        const user = await UserModel.findOne({username: username}).select("+password +email").exec();

        if(!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw createHttpError(401, "Invalid Credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
    
};

export const logout: RequestHandler = (req:Request, res: Response,  next) => {
    req.session.destroy(error => {
        if(error){
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
}
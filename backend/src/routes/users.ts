import express from "express";
import * as UserController from "../controllers/usersControllers";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();
/**retrieve auth user */
router.get("/", requiresAuth, UserController.getAuthenticatedUser);
/**create endpoint for signup  */
router.post("/signup", UserController.signUp);
/**login endpoint for user */
router.post("/login", UserController.login);

router.post("/logout", UserController.logout);



export default router;
import express from "express";
import AuthController from "../controller/auth.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";
const AuthRoute = express.Router();


AuthRoute.post("/login", AuthController.login);
AuthRoute.post("/register", AuthController.register);
AuthRoute.get("/logout", verifyToken, AuthController.logout)


export default AuthRoute;
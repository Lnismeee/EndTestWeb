import asyncHandler from '../utils/async-handler.js';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();
const { ACCESS_KEY } = process.env;

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req?.headers?.authorization;
    if (token) {
        const accessToken = token.split(" ")[1];
        try {
            const user = jwt.verify(accessToken, ACCESS_KEY);
            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    } else {
        return res.status(401).json("You are not authenticated");
    }
});
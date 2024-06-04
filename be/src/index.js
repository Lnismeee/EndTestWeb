import * as dotenv from 'dotenv'
dotenv.config();
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { connect } from "mongoose";
const { SERVER_PORT, MONGODB_URL, CLIENT_URL } = process.env;
import indexRouter from './routes/index.route.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser())
app.use(json());
app.use(urlencoded({ extended: true }));

app.get(
    '/',
    (req, res) => {
        res.send("API is working")
    }
);

app.use(
    '/api/v1',
    indexRouter
);


const startServer = async () => {
    try {
        await connect(MONGODB_URL);
        console.log(">>> Connected to MongoDB");
        const server = app.listen(SERVER_PORT || 5000, () => {
            console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

startServer();
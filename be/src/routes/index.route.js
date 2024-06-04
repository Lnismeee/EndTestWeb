import express from "express";
import AuthRoute from "./auth.route.js";
import MoviesRoute from "./movies.route.js";

const indexRouter = express.Router();
indexRouter.use("/auth",AuthRoute )
indexRouter.use("/movies",MoviesRoute )

export default indexRouter
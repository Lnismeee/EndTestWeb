import express from "express";
import MoviesController from "../controller/movies.controller.js";
const MoviesRoute = express.Router();


MoviesRoute.post("/", MoviesController.addOne);
MoviesRoute.put("/:movieId", MoviesController.updateOne);
MoviesRoute.delete("/:movieId", MoviesController.deleteOne);
MoviesRoute.get("/search", MoviesController.searchByName);
MoviesRoute.get("/sort", MoviesController.sortMovieByYear);
MoviesRoute.get("/", MoviesController.getAll);




export default MoviesRoute;
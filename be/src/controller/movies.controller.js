import MovieModel from "../models/Movie.model.js";
import asyncHandler from "../utils/async-handler.js";

const MoviesController = {
    addOne: asyncHandler(async (req, res) => {
        try {
            const input = { ...req.body };
            const movies = await MovieModel.create(input);
            return res.status(201).json({
                message: "Created",
                data: movies,
            });
        } catch (error) {
            res.status(500).json("Internal Serve error");
        }
    }),
    getAll: asyncHandler(async (req, res) => {
        try {
            const movies = await MovieModel.find({});
            return res.status(200).json({
                message: "Get successfully",
                data: movies,
            });
        } catch (error) {
            res.status(500).json("Internal Serve error");
        }
    }),
    updateOne: asyncHandler(async (req, res) => {
        try {
            const { movieId } = req.params;
            const input = { ...req.body };
            const movies = await MovieModel.findByIdAndUpdate(movieId, input);
            const result = await MovieModel.findById(movieId);
            return res.status(200).json({
                message: "Updated",
                data: result,
            });
        } catch (error) {
            res.status(500).json("Internal Serve error");
        }
    }),
    deleteOne: asyncHandler(async (req, res) => {
        try {
            const { movieId } = req.params;
            const movies = await MovieModel.findByIdAndDelete(movieId);
            return res.status(200).json({
                message: "Deleted",
                data: movies,
            });
        } catch (error) {
            res.status(500).json("Internal Serve error");
        }
    }),
    searchByName: asyncHandler(async (req, res) => {
        try {
            const { keyword } = req.query;
            
            let query = {};
            if (keyword) {
                query.name = { $regex: keyword, $options: "i" };
            }
            const result = await MovieModel.find(query).exec();

            res.status(200).json({
                message: "successfully",
                data: result
            })
        } catch (error) 
        {
            res.status(500).json("Internal Serve error");

        }
    }),
    sortMovieByYear: asyncHandler(async (req, res) => {
        try {
            const { sort } = req.query;
            let result;
            if (sort === "desc"){
                result = await MovieModel.find({}).sort({ year: -1 })
            }
            else if (sort === "asc"){
                result = await MovieModel.find({}).sort({ year: 1 })
                
            }
            res.status(200).json({
                message: "successfully",
                data: result
            })
        } catch (error) {}
    }),
};

export default MoviesController;

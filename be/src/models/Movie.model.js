import { Schema, model } from "mongoose";

const Movie = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        introduce: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model("Movie", Movie);

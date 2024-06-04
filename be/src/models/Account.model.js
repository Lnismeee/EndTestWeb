import { Schema, model } from "mongoose";



const Account = new Schema({
    name: {
        type: String,
        default: null,

    },
    email: {
        type: String,
        default: null,
        minlength: 10,
        maxlength: 50,
    },
    phone: {
        type: String,
        minlength: 10,
        default: null,

    },
    
    password: {
        type: String,
        minlength: 8,
    },

}, { timestamps: true });
export default model("Account", Account)
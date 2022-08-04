import { model, Schema } from "mongoose";

const admin = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: String
})

module.exports = model('Admin', admin);
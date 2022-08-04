import { model, Schema } from "mongoose";

const base = new Schema({
    name: String,
    level: Number,
    imagePath: String
})

module.exports = model('Base', base);
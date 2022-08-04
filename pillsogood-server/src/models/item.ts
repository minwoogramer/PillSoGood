import { model, Schema } from "mongoose";

const item = new Schema({
    name: String,
    type: Number,
    imagePath: String
})

module.exports = model('Item', item); 
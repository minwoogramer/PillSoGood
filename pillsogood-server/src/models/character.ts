import { model, Schema } from "mongoose";

const character = new Schema({
    userId: String,
    name: String,
    level: Number,
    baseId: String,
    createdAt: String,
    description: String,
    hash: String,
    tokenId: String
})

module.exports = model('Character', character);
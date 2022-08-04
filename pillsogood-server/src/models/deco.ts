import { model, Schema } from "mongoose";

const deco = new Schema({
    characterId: String,
    itemId: String,
    location: String,
    userId: String
})

module.exports = model('Deco', deco); 
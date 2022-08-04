import { model, Schema } from "mongoose";

const health = new Schema({
    userId: String,
    height: Number,
    weight: Number,
    lowHypertension: Number,
    HighHypertension: Number,
    bloodSugarLevel: Number,
    createdAt: String
})

module.exports = model('Health', health); 
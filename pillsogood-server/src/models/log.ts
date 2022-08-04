import { model, Schema } from "mongoose";

const log = new Schema({
    userId: String,
    methodName: String,
    createdAt: String
})

module.exports = model('Log', log); 
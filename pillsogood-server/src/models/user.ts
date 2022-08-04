import { model, Schema } from "mongoose";

const user = new Schema({
    nickname: String,
    email: String,
    dateOfBirth: String,
    password: String,
    pointBalance: Number,
    disease: [Number],
    createdAt: String,
    phoneNumber: String,
    firebaseToken: String
})

module.exports = model('User', user); // user스키마를 User라는 이름으로 export
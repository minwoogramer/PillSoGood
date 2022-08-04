import { model, Schema, Types } from 'mongoose';

const medication = new Schema({
    jwt : String,
    medicine : String,
    condition : String,
    createdAt: String
})

module.exports = model('Medication', medication); // user스키마를 User라는 이름으로 export
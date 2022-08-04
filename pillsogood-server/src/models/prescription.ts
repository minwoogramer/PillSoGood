import { model, Schema, Types } from 'mongoose';

const prescription = new Schema({
    medicine : String,
    alertTime : String,
    lastMedicationCount : Number, // String형인지 Number형인지?
    createdAt: String,
    userId: { type: 'ObjectId', ref: 'User' }
})

module.exports = model('Prescription', prescription); // user스키마를 User라는 이름으로 export
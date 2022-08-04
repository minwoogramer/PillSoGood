import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Medication = require("../../models/medication")
const moment = require("moment")
const User = require("../../models/user")
const Prescription = require("../../models/prescription")

type medication = {
    _id:String,
    medicine:String,
    condition:String,
    createdAt:String
    userId:string
}

export default {
    Query: {
        async getMedicationRecords(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getMedicationRecords", userInfo._id)

            const medications = Medication.find({
                userId:userInfo._id
            })
            return medications
        }
    },
    Mutation : {
        async createMedicationRecord(_:any, args: {jwt:string, medicine:String,  condition:String}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            
            createLog("createMedicationRecord", userInfo._id)

            const newMedication = new Medication()

            newMedication.medicine = args.medicine
            newMedication.condition = args.condition
            newMedication.createdAt =  moment().format("YYYY-MM-DD HH:mm:ss")
            newMedication.userId = userInfo._id
            
            const res = await newMedication.save()
            
            const findUser = await User.findOne({_id:userInfo._id})
            const previousBalance = findUser.pointBalance
            const currentBalance = Number(previousBalance+10)
            const newData = { pointBalance: currentBalance }               // 제공할 포인트 점수
            const res2 = await User.updateOne({_id:userInfo._id}, newData) // 업데이트 하기 
            await Prescription.updateOne({userId:userInfo._id, medicine:args.medicine}, {$inc: { lastMedicationCount: -1}})

    
            if(!res || !res2) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async  updateMedicationRecord(_:any, args:  {jwt:string, _id:string, medicine:String,  condition:String}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog(" updateMedicationRecord", userInfo._id)

            const res = await Medication.updateOne(
                {_id:args._id, userId:userInfo._id},
                {medicine:args.medicine, condition:args.condition, createdAt:new Date()}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteMedicationRecord(_:any, args: {jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("deleteMedicationRecord", userInfo._id)
            
            const res = await Medication.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}
import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Health = require("../../models/health")
const moment = require("moment")

type health = {
    _id:string
    height:number
    weight:number
    lowHypertension:number
    highHypertension:number
    bloodSugarLevel:number
    createdAt:string
    userId:string
}

export default {
    Query: {
        async getHealthRecords(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getHealthRecords", userInfo._id)

            const healths = Health.find({
                userId:userInfo._id
            })
            return healths
        }
    },
    Mutation : {
        async createHealthRecord(_:any, args: {jwt:string, height:number, weight:number, lowHypertension:number, highHypertension:number, bloodSugarLevel:number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createHealthRecord", userInfo._id)

            const newHealth = new Health()
            newHealth.height = args.height
            newHealth.weight = args.weight
            newHealth.lowHypertension = args.lowHypertension
            newHealth.highHypertension = args.highHypertension
            newHealth.bloodSugarLevel = args.bloodSugarLevel
            newHealth.userId = userInfo._id
            newHealth.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
            const res = await newHealth.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateHealthRecord(_:any, args: {jwt:string, _id:string, height:number, weight:number, lowHypertension:number, highHypertension:number, bloodSugarLevel:number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("updateHealthRecord", userInfo._id)

            const res = await Health.updateOne(
                {_id:args._id, userId:userInfo._id},
                {height:args.height, weight:args.weight, lowHypertension:args.lowHypertension, highHypertension:args.highHypertension, bloodSugarLevel:args.bloodSugarLevel, createdAt:new Date()}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteHealthRecord(_:any, args: {jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("deleteHealthRecord", userInfo._id)
            
            const res = await Health.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}
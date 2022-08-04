import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"

const Log = require("../../models/log")

type Log = {
    _id:string
    methodName:string
    createdAt:string
    user:User
}

type User = {
    _id:string
    email:string
    password:string
    nickname:string
    dateOfBirth:string
    pointBalance:number
    createdAt:string
    disease:[number]
    phoneNumber:string
}

export default {
    Query: {
        async getLogsByCreatedAt(_:any, args:{jwt:string, createdAt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const aggregatorOpts = [
                {
                    $match:{
                        createdAt:args.createdAt
                    }
                },
                {
                    $group:{
                        _id:"$methodName",
                        count:{$sum:1}
                    }
                },
                {
                    $sort:{
                        'count':1
                    }
                }
            ]
        
            const logs = Log.aggregate(aggregatorOpts).exec()

            return logs
        }
    }
}
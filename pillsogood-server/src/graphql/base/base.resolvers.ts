import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"

const Base = require("../../models/base")

type base = {
    _id: string
    name: string
    level: number
    imagePath: string
}

export default {
    Query: {
        async getBases(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const bases = await Base.find()
            return bases
        },
        async getBase(_:any, args:{jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const base = await Base.findOne({
                _id: args._id
            })
            return base
        }
    },
    Mutation : {
        async createBase(_:any, args:{jwt:string, name:string, level:number, imagePath:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const newBase = new Base()
            newBase.name = args.name
            newBase.level = args.level
            newBase.imagePath = args.imagePath

            const res = await newBase.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateBase(_:any, args:{jwt:string, name:string, level:number, imagePath:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Base.updateOne(
                {_id:args._id},
                {name:args.name, level:args.level, imagePath:args.imagePath}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteBase(_:any, args:{jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Base.deleteOne(
                {_id:args._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}
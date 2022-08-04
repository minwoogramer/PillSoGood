import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import internal from "stream"

const Item = require("../../models/item")

enum ItemType {
     hat = 0,
     shoes = 1
}

export default {
    Query: {
        async getItems(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const items = await Item.find()
            return items
        },
        async getItem(_:any, args:{jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const item = await Item.findOne({_id:args._id})
            return item
        }
    },
    Mutation: {
        async createItem(_:any, args:{jwt:string, type:number, name:string, imagePath:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const newItem = new Item()
            newItem.type = args.type
            newItem.name = args.name
            newItem.imagePath = args.imagePath
            const res = await newItem.save()

            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateItem(_:any, args:{jwt:string, _id:string, type:number, name:string, imagePath:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Item.updateOne(
                {_id:args._id},
                {name:args.name, type:args.type, imagePath:args.imagePath}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteItem(_:any, args:{jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Item.deleteOne(
                {_id:args._id}
            )

            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}
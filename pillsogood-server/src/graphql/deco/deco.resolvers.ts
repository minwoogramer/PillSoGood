import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Deco = require("../../models/deco")
const Item = require("../../models/item")
const User = require("../../models/user")

const ITEM_PRICE = 3

type deco = {
    _id: string
    characterId: string
    userId: string
    itemId: string
    location: string
    item: item
}

type item = {
    _id: string
    name: string
    type: number
    imagePath: string
}
export default {
    Deco: {
        async item(root:any) {
            const itemInfo = await Item.findOne({
                _id:root.itemId
            })
            return itemInfo
        }
    },
    Query: {
        // 가지고 있는 데코 아이템 목록 조회
        async getDecoItems(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getDecoItems", userInfo._id)

            const decoItems = await Deco.find({
                userId:userInfo._id
            })
            return decoItems
        },
        // 캐릭터에 장착한 데코 아이템 목록 조회
        async getCharacterDecoItems(_:any, args:{jwt:string, characterId:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getCharacterDecoItems", userInfo._id)

            const characterDecoItems = await Deco.find({
                userId:userInfo._id,
                characterId:args.characterId
            })
            return characterDecoItems
        }
    },
    Mutation: {
        async addDecoItem(_:any, args:{jwt:string, itemId:String}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("addDecoItem", userInfo._id)

            const currentUserInfo = await User.findOne({
                _id:userInfo._id
            })

            if(currentUserInfo.pointBalance < ITEM_PRICE) return status.INSUFFICIENT_BALANCE
            const newDeco = new Deco()
            newDeco.itemId = args.itemId
            newDeco.userId = userInfo._id            

            await newDeco.save()

            const res = await User.updateOne(
                {_id:userInfo._id},
                {pointBalance:currentUserInfo.pointBalance - ITEM_PRICE}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS

        }, 
        async addCharacterDecoItem(_:any, args:{jwt:string, characterId:string, itemId:string, location:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("addCharacterDecoItem", userInfo._id)

            const res = await Deco.updateOne(
                {userId:userInfo._id, itemId:args.itemId},
                {characterId:args.characterId, location:args.location}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async removeCharacterDecoItem(_:any, args:{jwt:string, characterId:string, itemId:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Deco.updateOne(
                {userId:userInfo._id, itemId:args.itemId, characterId:args.characterId},
                {characterId:null, location:null}
            )

            createLog("removeCharacterDecoItem", userInfo._id)

            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}
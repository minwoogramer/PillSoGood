import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const User = require("../../models/user")
const moment = require("moment")
type user = {
    _id: string
    email: string
    password: string
    nickname: string
    dateOfBirth: string
    pointBalance: number
    createdAt: string
    phoneNumber: string
    disease: [number]
}

type token = {
    jwt:string
}
 
export default {
    Query: {
        hi():string {
            return "hello 👋"
        },
        async getUserInfo(_:any, args:{jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED
            
            if(args._id !== null && args._id !== undefined) {
                let user = await User.findOne({
                    _id:args._id
                })
                return user
            }
            createLog("getUserInfo", userInfo._id)

            let user = await User.findOne({
                _id:userInfo._id
            })
            return user
        },
        async getUsers(_:any, args:{jwt:string, nickname:string, email:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            if(args.nickname) {
               return await User.find({nickname:new RegExp(args.nickname, 'i')})
            }
            if(args.email) {
                return await User.find({email:new RegExp(args.email, 'i')})
            }

            return await User.find()
        }
    },
    Mutation: {
        async join(_:any, args: {nickname:string, email:string, dateOfBirth:string, password:string,  phoneNumber:string, disease:[number]}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            const savedUser = await User.findOne({
                email:args.email
            });
            if(savedUser) return status.ALREADY_EXISTS_DATA

            const newUser = new User()
            newUser.nickname = args.nickname
            newUser.email = args.email
            newUser.dateOfBirth = args.dateOfBirth
            newUser.password = encryptedPassword
            newUser.pointBalance = 0
            newUser.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
            newUser.phoneNumber = args.phoneNumber
            newUser.disease = args.disease
            const res = await newUser.save() // 저장 
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS

        }, 
        async login(_:any, args: {email:string, password:string, firebaseToken:string}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            
            const loginUser = await User.findOne({
                email:args.email, password:encryptedPassword
            });
            if(!loginUser) return status.WRONG_USER_INFO

            createLog("login", loginUser._id)

            await User.updateOne(
                {_id: loginUser._id},
                {firebaseToken: args.firebaseToken}    
            )

            const jwt = require('jsonwebtoken')
            const accessToken = jwt.sign(
              {
                _id: loginUser._id,
                email: loginUser.email,
                nickname: loginUser.nickname
              },
              process.env.ACCESS_SECRET,
              {expiresIn:'365d'}
            )

            return {"jwt": accessToken, "email": loginUser.email, "nickname": loginUser.nickname, "_id":loginUser._id}

        },
        async updateUserInfo(_:any, args:{jwt:string, nickname:string, password:string, phoneNumber:string, email:string, disease:[number]}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            var newData = {}

            if(args.password !== null && args.password !== undefined) {
                const crypto = require('crypto');
                const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
                newData = {nickname:args.nickname, password:encryptedPassword, phoneNumber:args.phoneNumber, email:args.email, disease:args.disease}
            } else {
                newData = {nickname:args.nickname, phoneNumber:args.phoneNumber, email:args.email, disease:args.disease}
            }

            const res = await User.updateOne({_id:userInfo._id}, newData)
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateUserPassword(_:any, args:{jwt:string, _id:string, password:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            const res = await User.updateOne({_id:args._id}, {password:encryptedPassword})
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateUserBalance(_:any, args:{jwt:string, pointBalance:number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await User.updateOne(
                {_id:userInfo._id},
                {pointBalance: args.pointBalance}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}


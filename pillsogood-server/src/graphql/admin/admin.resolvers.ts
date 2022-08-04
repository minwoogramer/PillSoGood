import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import moment from "moment"

const Admin = require("../../models/admin")
type name = {
    _id: number
    name: string
    email: string
    password: string
    createdAt: string
}

type token = {
    jwt:string
}
 
export default {
    Query: {
        async getAdminInfo(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED
            const admin = Admin.findOne({
                _id:userInfo._id
            })
            return admin
        },
        async getAdmins(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED
            const admins = Admin.find()
            return admins
        }
    },
    Mutation: {
        async joinAdmin(_:any, args: {name:string, email:string, password:string}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            const savedAdmin = await Admin.findOne({
                email:args.email
            });
            if(savedAdmin) return status.ALREADY_EXISTS_DATA

            const newAdmin = new Admin()
            newAdmin.email = args.email
            newAdmin.name = args.name
            newAdmin.password = encryptedPassword
            newAdmin.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
            const res = await newAdmin.save() 
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS

        }, 
        async loginAdmin(_:any, args: {email:string, password:string}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            
            const loginAdmin = await Admin.findOne({
                email:args.email, password:encryptedPassword
            });
            if(!loginAdmin) return status.WRONG_USER_INFO

            const jwt = require('jsonwebtoken')
            const accessToken = jwt.sign(
              {
                _id: loginAdmin._id,
                email: loginAdmin.email,
                name: loginAdmin.name,
                createdAt: loginAdmin.createdAt
              },
              process.env.ACCESS_SECRET,
              {expiresIn:'365d'}
            )

            return {"jwt": accessToken}

        }
    }
}
import { status } from "../constants/code"

export function getUserInfoByToken(accessToken:string):any {
    try {
        const jwt = require('jsonwebtoken')
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_SECRET)
        return decodedToken
    }catch(e) {
        return status.SERVER_ERROR
    }
}
const Log = require("../models/log")
const moment = require("moment")

export async function createLog(methodName:string, userId:string) {
    const newLog = new Log()
    newLog.methodName = methodName
    newLog.userId = userId
    newLog.createdAt = parseInt(moment().format("YYYYMMDD"))
    await newLog.save()
}
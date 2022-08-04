const Prescription = require('../models/prescription')
const moment = require('moment')

const admin = require('firebase-admin')
const serviceAccount = require('./beb-04-pillsogood-firebase-adminsdk-t99tv-e95d724d69.json')

export const initFirebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const sendMedicationAlert = async () => {
  const alivePrescription = await Prescription.find({
    lastMedicationCount: { $ne: 0 },
    alertTime: moment().format('HH:mm'),
  }).populate('userId')

  for (let alertData of alivePrescription) {
    const message = {
      android: {
        priority: 'high',
        notification: {
          title: `Pill So Good!`,
          body: `${alertData.medicine} 먹을 시간입니다.`,
        },
      },
      token: alertData.userId.firebaseToken,
    }

    await admin.messaging().send(message)
  }
}

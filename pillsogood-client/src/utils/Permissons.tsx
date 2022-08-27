import {
  check,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from "react-native-permissions";
import { Platform } from "react-native";
// const RESULTS = {
//   UNAVAILABLE: "This feature is not available",
//   DENIED: "The permission has not been requested / is denied but requestable",
//   GRANTED: "The permission is granted",
//   LIMITED: "The permission is granted but with limitations",
//   BLOCKED: "The permission is denied and not requestable anymore",
// };
const androidPermissions = {
  notification: PERMISSIONS.ANDROID?.POST_NOTIFICATIONS,
  camera: PERMISSIONS.ANDROID?.CAMERA,
  photo: PERMISSIONS.ANDROID?.READ_EXTERNAL_STORAGE,
};

const askPermission = async () => {
  try {
    const result = await requestMultiple([
      androidPermissions?.notification,
      androidPermissions?.camera,
      androidPermissions?.photo,
    ]);
    console.log(result, "permission granted");
  } catch (error) {
    console.log("askPermission", error);
  }
};

export default askPermission;

import { Platform } from "react-native";

const _ANDROID_AVD_API_HOST = "http://10.0.2.2:4000";
const _IOS_API_HOST = "http://localhost:4000";

export const getAPIHost = () => {
  if (Platform.OS === "ios") {
    return _IOS_API_HOST;
  } else if (Platform.OS === "android") {
    return _ANDROID_AVD_API_HOST;
  } else {
    throw "Platform not supported";
  }
};

import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import notifee, {
  AndroidImportance,
  AndroidColor,
} from "@notifee/react-native";
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    providesAppNotificationSettings: true,
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || //알림권한 ok
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}
export async function GetFCMToken() {
  let fcmToken = await AsyncStorage.getItem("fcmtoken");
  console.log("fcmToken:old token", fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("fcmToken:new token", fcmToken);
        await AsyncStorage.setItem("fcmtoken", fcmToken);
      }
    } catch (error) {
      console.log("Failed to get FCM token");
    }
  }
}

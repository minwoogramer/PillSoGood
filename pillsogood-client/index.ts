import { registerRootComponent } from "expo";
import App from "./App";
import messaging from "@react-native-firebase/messaging";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications
messaging().setBackgroundMessageHandler(async (msg) => {
  console.log(msg);
});

// messaging()
//   .getInitialNotification()
//   .then((remoteMessage) => {
//     if (remoteMessage) {
//       console.log("[push] getInitialNotification", remoteMessage);
//     }
//   });
registerRootComponent(App);

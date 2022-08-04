import { AppState } from "react-native";
import notifee, {
  AndroidImportance,
  AndroidColor,
} from "@notifee/react-native";

const displayNotification = async (message) => {
  const channelAnoucement = await notifee.createChannel({
    id: "default",
    name: "PillSoGood",
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    android: {
      channelId: channelAnoucement,
      smallIcon: "ic_launcher",
      asForegroundService: true,
    },
    title: message.notification.title,
    body: message.notification.body,
  });
};

export default {
  displayNoti: (remoteMessage) => displayNotification(remoteMessage),
};

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import SplashScreen from "react-native-splash-screen";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import Root from "./navigators/RootStack";
import { Alert } from "react-native";
import { requestUserPermission } from "./src/utils/Pushnotification";
import askPermission from "./src/utils/Permissons";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import pushNoti from "./src/utils/pushNoti";
import notifee, {
  AndroidImportance,
  AndroidColor,
} from "@notifee/react-native";

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      return pushNoti.displayNoti(remoteMessage);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    askPermission();
    requestUserPermission();
    // NotificationListener();
    SplashScreen.hide();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

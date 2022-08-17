import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Reminder from "../../screens/Health/Reminder";
import Health from "../../screens/Health/Health";
import { createDrawerNavigator } from "@react-navigation/drawer";
export type HomeStackParamList = {
  Home: undefined;
  Reminder: undefined;
};
const HomeStackScreen = () => {
  const HomeStack = createDrawerNavigator<HomeStackParamList>();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Reminder" component={Reminder} />
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;

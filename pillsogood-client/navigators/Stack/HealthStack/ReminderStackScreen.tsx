import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reminder from "../../../screens/Health/Reminder";

import Home from "../../../screens/Home";
export type ReminderParamList = {
  Home: undefined;
  Reminder: undefined;
};
export default function ReminderStackScreen() {
  const ReminderStack = createNativeStackNavigator<ReminderParamList>();

  return (
    <ReminderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ReminderStack.Screen name="Home" component={Home} />
      <ReminderStack.Screen name="Reminder" component={Reminder} />
    </ReminderStack.Navigator>
  );
}

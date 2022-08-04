import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reminder from "../../../screens/Health/Reminder";


import Home from "./../../../screens/Home";
export default function ReminderStackScreen() {
  const ReminderStack = createNativeStackNavigator();

  return (
    <ReminderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HealthStack.Screen name=" Home" component={Home} />
      <ReminderStack.Screen name="Reminder" component={Reminder} />
    </ReminderStack.Navigator>
  );
}

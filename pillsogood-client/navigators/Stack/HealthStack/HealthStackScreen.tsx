import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Health from "../../../screens/Health/Health";
import { MyHealthInfo } from "../../../screens/Mypage/MyHealthInfo";
import Home from "../../../screens/Home";
export default function HealthStackScreen() {
  const HealthStack = createNativeStackNavigator();

  return (
    <HealthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HealthStack.Screen name=" Home" component={Home} />
      <HealthStack.Screen name="Health" component={Health} />
      <HealthStack.Screen name="MyHealthInfo" component={MyHealthInfo} />
    </HealthStack.Navigator>
  );
}

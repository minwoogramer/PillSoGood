import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackNavigationOptions } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import Home from "../../screens/Home";
import Reminder from "../../screens/Health/Reminder";
import MyHealth from "../../screens/Health/MyHealth";
import DrawerTab from "./DrawerTab";
import type { RouteProp } from "@react-navigation/native";
export type RoutParamList = {
  Home: undefined;
  DrawerTab: undefined;
  Reminder: undefined;
};
type ProfileScreenRouteProp = RouteProp<
  RoutParamList,
  "Home" | "DrawerTab" | "Reminder"
>;
interface IconType {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}
export type TabParamList = {
  route: RoutParamList;
  navigation: any;
};
export const TabNavigation: React.FunctionComponent<ProfileScreenRouteProp> = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ name, color, size }: IconType) => {
          switch (route.name) {
            case "Home":
              name = "home-outline";
              break;
            case "DrawerTab":
              name = "search";
              size = 30;
              break;
            // case "HealthStackScreen":
            //   iconName = "search";
            //   break;
            case "Reminder":
              name = "person-circle-outline";
              size = 28;
              break;
            default:
              break;
          }
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="DrawerTab"
        component={DrawerTab}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })}
      />
      <Tab.Screen name="Reminder" component={Reminder} />
    </Tab.Navigator>
  );
};

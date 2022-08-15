import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import Home from "../../screens/Home";
import Reminder from "../../screens/Health/Reminder";
import MyHealth from "../../screens/Health/MyHealth";
import DrawerTab from "./DrawerTab";
export default function TabNavigation(props) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "DrawerTab":
              iconName = "search";
              size = 30;
              break;
            // case "HealthStackScreen":
            //   iconName = "search";
            //   break;
            case "Reminder":
              iconName = "person-circle-outline";
              size = 28;
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
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
}

import * as React from "react";
import { Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import Home from "../../screens/Home";
import RandomCharacter from "../../screens/NFT/Character/RandomCharacter";
import Characters from "../../screens/NFT/Character/Characters";
import CharacterDeco from "../../screens/NFT/Character/CharacterDeco";
import MyHealth from "../../screens/Health/MyHealth";
import CustomDrawer from "../../src/components/CustomDrawer";
import Health from "../../screens/Health/Health";
import type { ParamListBase, RouteProp } from "@react-navigation/native";
const Drawer = createDrawerNavigator();

export default function DrawerTab(): React.ReactElement<
  DrawerNavigationProp<ParamListBase>
> {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="history"
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="RandomCharacter"
        component={RandomCharacter}
        options={{ drawerLabel: "GetCharacter" }}
      />
      <Drawer.Screen
        name="Characters"
        component={Characters}
        options={{ drawerLabel: "Characters" }}
      />
      <Drawer.Screen
        name="CharacterDeco"
        component={CharacterDeco}
        options={{ drawerLabel: "CharacterDeco" }}
      />
      <Drawer.Screen
        name="MyHealth"
        component={MyHealth}
        options={{ drawerLabel: "MyHealth" }}
      />
      <Drawer.Screen
        name="Health"
        component={Health}
        options={{ drawerLabel: "Health" }}
      />
    </Drawer.Navigator>
  );
}

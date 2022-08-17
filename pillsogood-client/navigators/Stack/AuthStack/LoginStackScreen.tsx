import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../../screens/Auth/Login";
import { TabNavigation } from "./../../Tabs/TabNavigation";
import Register from "./../../../screens/Auth/Register";
export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
};
const Nav = createNativeStackNavigator<LoginStackParamList>();
const LoginStackScreen = () => (
  <Nav.Navigator>
    <Nav.Screen name="Login" component={Login} />
    <Nav.Screen name="Register" component={Register} />
    <Nav.Screen name="Tabs" component={TabNavigation} />
  </Nav.Navigator>
);
export default LoginStackScreen;
//로그인스텍

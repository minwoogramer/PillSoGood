import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../../screens/Auth/Login";
const Nav = createNativeStackNavigator();

const LoginStackScreen = () => (
  <Nav.Navigator>
    <Nav.Screen name="Login" component={Login} />
  </Nav.Navigator>
);
export default LoginStackScreen;
//로그인스텍

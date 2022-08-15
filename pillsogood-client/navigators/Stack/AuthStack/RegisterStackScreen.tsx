import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { BASE_COLOR } from "../../../colors";
import Login from "../../../screens/Auth/Login";
import Register from "../../../screens/Auth/Register";
import Home from "../../../screens/Home";
import { useSelector } from "react-redux";
import TabNavigation from "./../../Tabs/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Nav = createNativeStackNavigator();

const RegisterStackScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let jwtToken = useSelector((state) => state.login.token);

  // const [openSettingsForNotifications] = useMMKVStorage(
  //   "openSettingsForNotifications",
  //   MMKV,
  //   false
  // );
  useEffect(() => {
    //인증상태감지
    if (jwtToken) {
      setIsLoggedIn(true);
      console.log("로그인성공");
    } else {
      setIsLoggedIn(false);
      console.log("로그인실패");
    }
    console.log(jwtToken, "token");
  }, []);
  return (
    <Nav.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: BASE_COLOR,
        },
        headerShown: false,
      }}
    >
      {!isLoggedIn ? (
        <>
          <Nav.Screen name="Login" component={Login} />
          <Nav.Screen name="Register" component={Register} />
        </>
      ) : (
        <Nav.Screen name="Tabs" component={TabNavigation} />
      )}
    </Nav.Navigator>
  );
};

export default RegisterStackScreen;
//로그인과 회원가입창 스텍

import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, SafeAreaView } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons//FontAwesome5";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { USERQUERY } from "../query/MutationQuery";
import { RootState } from "../store";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const jwt = useSelector((state: RootState) => state.login.token);

  const { data } = useQuery(USERQUERY, { variables: { jwt: jwt } });
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    console.log("useEffect data :", data);
    if (data !== undefined) {
      setBalance(data.getUserInfo.pointBalance);
      console.log(balance);
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#99f2c8" }}
      >
        <View
          style={{
            flex: 0.2,
            backgroundColor: "#1f4037",
            padding: 20,
          }}
        >
          <Image
            source={require("../assets/highland.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{ fontSize: 16, color: "#fff", fontFamily: "Roboto-Medium" }}
          >
            난 귀엽소
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Roboto-Regular",
                marginRight: 5,
              }}
            >
              {balance} Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Text>Logout</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

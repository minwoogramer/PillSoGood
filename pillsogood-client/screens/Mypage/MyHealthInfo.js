import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const MyHealthInfo = () => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        ]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          top: 415,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => navigation.push("Health")}>
          <Text>Health</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("MyHealth")}>
          <Text>MyHealth</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

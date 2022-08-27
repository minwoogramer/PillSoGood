import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";
function Multiselect({ value, setValue }: any) {
  const [FAT_BLOOD_RATE, HIGH_BLOOD_PRESSURE, SUGAR_BLOOD_RATE, HAIR_LESS] = [
    0,
    1,
    2,
    3,
  ];
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "고지혈증", value: FAT_BLOOD_RATE },
    { label: "고혈압", value: HIGH_BLOOD_PRESSURE },
    { label: "당뇨", value: SUGAR_BLOOD_RATE },
    { label: "탈모", value: HAIR_LESS },
  ]);
  return (
    <View>
      <DropDownPicker
        style={{
          borderColor: "white",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          marginVertical: 22,
        }}
        containerStyle={{}}
        dropDownContainerStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.87)",
        }}
        placeholderStyle={{
          color: "grey",
          fontWeight: "bold",
        }}
        dropDownDirection={"TOP"}
        showTickIcon={false}
        showArrowIcon={true}
        placeholder="질환을 선택해주세요"
        multiple={true}
        min={0}
        max={3}
        open={open}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#8ac926", "#00b034"]}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}
export default Multiselect;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BASE_COLOR } from "../../colors";
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};
type Submit = {
  onSubmit: {
    (base64: string | undefined): {
      text: string;
    };
  };
};
export default function DateTime({
  text,
  onChangeText,
}: {
  text: string;
  onChangeText(date: { format: (arg0: string) => string }): void;
}) {
  const placeholder = "생년월일을 입력해주세요";
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: {
    format: (arg0: string) => { format: (arg0: string) => string };
  }) => {
    console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
    hideDatePicker();
    onChangeText(date.format("yyyy/MM/dd"));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          pointerEvents="none"
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
          editable={false}
          value={text}
        />
        <DateTimePickerModal
          headerTextIOS={placeholder}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${BASE_COLOR}`,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "#ffffff7f",
    fontSize: 16,
    color: "#000000",
    height: 50,
    width: 370,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});

import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { verifyActions } from "../store/visionVerifySlice";
import { Alert } from "react-native";
const ImagePickView = styled.View`
  width: 100%;
  height: 80px;
  padding-top: 30px;
`;
const ImageTxtBTN = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: #76a991;
  align-items: center;
  justify-content: center;
`;
const ImageBtn = styled.Text`
  color: white;
  flex: 1;
  font-weight: 600;
  font-size: 15px;
  margin-top: 15px;
`;
function ImagePickerComponent({ onSubmit }) {
  let username = useSelector((state) => state.login.nickname);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");
  const dispatch = useDispatch();
  console.log(text, "text data");
  console.log(text.includes(username), "data");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true, //return base64 data.
      //this will allow the Vision API to read this image.
    });

    if (!result.cancelled) {
      //if the user submits an image,
      setImage(result.uri);
      //run the onSubmit handler and pass in the image data.
      setText("Loading.."); //set value of text Hook
      const responseData = await onSubmit(result.base64);
      setText(responseData.text); //change the value of this Hook again.
    }
    if (text.includes(username)) {
      //이름으로만 검증중, 약봉투의 날짜와 사용자가 예측 불가능한 정보로 검증 추가 필요성 있음
      dispatch(verifyActions.setVerify(true)); //검증성공
      Alert.alert(
        "검증성공 약 이름,  하루 복용량 , 일수 , 시간을 입력해주세요! "
      );
    } else {
      dispatch(verifyActions.setVerify(false)); //검증실패
      Alert.alert("검증에 실패하였습니다. 꼭 자신의 약봉투를 넣어주세요! ");
    }
  };
  return (
    <ImagePickView>
      <ImageTxtBTN>
        <ImageBtn onPress={pickImage}>약 봉투 검증</ImageBtn>
      </ImageTxtBTN>
    </ImagePickView>
  );
}
export default ImagePickerComponent;

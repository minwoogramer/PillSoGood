import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import DatePicker from "react-native-date-picker";
import ImagePickerComponent from "../../src/utils/ImagePickerComponent";
import callGoogleVisionAsync from "../../src/utils/helperFunctions";
const moment = require("moment");
import { useSelector } from "react-redux";
import { MEDICINE_ALARM } from "../../src/query/MutationQuery";
import { useMutation } from "@apollo/client";
import { Alert, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RootState } from "../../src/store";
import { ReminderScreenProps } from "../../src/models/Reminder.type";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ReminderContainer = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 0px 20px;
`;
const HeadTxt = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px 0px 20px;
`;
const HeadWapper = styled.View`
  flex: 0.1;
  background-color: #76a991;
  border-radius: 20px;
  padding: 20px;
  width: ${SCREEN_WIDTH * 0.7};
  padding-top: -10px;
  margin-top: 5px;
  margin-bottom: -10px;
  align-items: center;
`;

const SubTxt = styled.Text`
  color: #202d35;
  font-size: 15px;
  font-weight: bold;
  margin-top: -20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const PillTxt = styled.Text`
  font-size: 16px;
`;
const PillVerifyTxt = styled.Text`
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Btn = styled.Button``;
const DateTxt = styled.Text`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
  font-size: 16px;
`;
const Titletxt = styled.Text`
  background-color: ${BASE_COLOR};
  color: #202d35;
  font-size: 16px;
  font-weight: bold;
  margin-top: -10px;
`;
const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
`;
const Inner = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: ${SCREEN_WIDTH * 0.8};
  padding: 20px;
  background-color: #ffffff7f;
  margin-top: 10px;
`;
const VerifyWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  width: 50%;
  margin-bottom: 50px;
`;
const VerifyContainer = styled.View`
  width: 100%;
  margin-top: -30px;
  margin-bottom: -30px;
`;

const SubmitAlarm = styled.View`
  margin-top: 10px;
  flex: 1;
  height: 50%;
  vertical-align: text-top;
  justify-content: space-between;

  align-items: center;
`;
const SubmitTxt = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: #76a991;
  align-items: center;
  justify-content: center;
`;
const SubmitTXTX = styled.Text`
  font-size: 18px;
  color: white;
`;
const Reminder: React.FC<ReminderScreenProps> = (props) => {
  let verifying = useSelector((state: RootState) => state.verify.verify);
  let jwtToken = useSelector((state: RootState) => state.login.token);
  let { navigation } = props;
  const [CreatePrescriptionRecord, { data }] = useMutation(MEDICINE_ALARM);
  const [times, setTimes] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [pillscale, setPillscale] = useState(0);
  const [pillday, setPillday] = useState(0);
  const lastMedi = pillscale * pillday;
  const setVerify = verifying;
  const Submit = () => {
    if (!setVerify) {
      Alert.alert("자신이 먹는 약봉투를 찍어주세요!");
    } else {
      CreatePrescriptionRecord({
        variables: {
          jwt: jwtToken,
          medicine: medicine,
          alertTime: moment(date).format("HH:mm"),
          lastMedicationCount: lastMedi,
        },
      });
      Alert.alert("알람등록성공!");
      navigation.navigate("Home");
    }
  };

  console.log(date);
  console.log(verifying, "verifying");
  //////////////////////////////////////////////////////////////

  return (
    <ReminderContainer>
      <HeadWapper>
        <HeadTxt>알람등록하기</HeadTxt>
      </HeadWapper>
      <SubTxt>복용 알람을 등록하세요</SubTxt>
      <Inner>
        <VerifyContainer>
          <VerifyWrapper>
            <ImagePickerComponent onSubmit={callGoogleVisionAsync} />
            <PillVerifyTxt>
              검증상태 :{"  "}
              {setVerify == false ? (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color="black"
                ></AntDesign>
              ) : (
                <AntDesign name="checkcircle" size={24} color="black" />
              )}
            </PillVerifyTxt>
          </VerifyWrapper>
        </VerifyContainer>
        {setVerify ? (
          <>
            <TextInputs
              placeholder="약 이름"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              value={medicine}
              returnKeyType="next"
              onChangeText={(text: string) => setMedicine(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            />

            <TextInputs
              placeholder="하루에 먹는 약 개수"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              value={pillscale}
              returnKeyType="next"
              onChangeText={(text: number) => setPillscale(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            />

            <TextInputs
              placeholder=" 먹는 약 일수"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              value={pillday}
              returnKeyType="next"
              onChangeText={(text: number) => setPillday(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            />
            <SubmitTxt onPress={() => setOpen(true)}>
              <SubmitTXTX>약은 언제 드시나요?</SubmitTXTX>
            </SubmitTxt>

            <DatePicker
              modal
              mode="time"
              locale="ko"
              androidVariant="nativeAndroid"
              textColor="black"
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
                console.log(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <DateTxt>설정한 시간: {moment(date).format("HH:mm")}</DateTxt>
            <SubmitAlarm>
              <SubmitTxt onPress={Submit}>
                <SubmitTXTX>알람 등록</SubmitTXTX>
              </SubmitTxt>
            </SubmitAlarm>
          </>
        ) : null}
      </Inner>
    </ReminderContainer>
  );
};
export default Reminder;

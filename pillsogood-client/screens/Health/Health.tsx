import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { BASE_COLOR } from "../../colors";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { HEALTH_RECORD } from "../../src/query/MutationQuery";
import { RootState } from "../../src/store";
import { HealthScreenProps } from "../../src/models/Health.model";

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  padding: 30px 20px;
`;
const TextInputs = styled.TextInput`
  flex: 1;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: white;
`;

const Btn = styled.TouchableOpacity`
  margin-top: 50px;
  width: 80%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;

  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
const TitleText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;
const TitleBox = styled.View`
  background-color: #76a991;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
`;
const Inner = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  border-radius: 25px;
  margin-top: 30px;
  padding: 20px;
  flex-direction: row;
`;

const Health: React.FC<HealthScreenProps> = (props) => {
  let jwtToken = useSelector((state: RootState) => state.login.token);
  const { navigation } = props;
  const weightInput = useRef<HTMLInputElement>(null);
  const highHypertensionInput = useRef<HTMLInputElement>(null);
  const lowHypertensionInput = useRef<HTMLInputElement>(null);
  const bloodSugerLevelInput = useRef<HTMLInputElement>(null);
  //컴포넌트에 포커스
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [highHypertension, setHighHypertension] = useState(0);
  const [lowHypertension, setLowHypertension] = useState(0);
  const [bloodSugerLevel, setBloodSugerLevel] = useState(0);

  const [CreateHealthRecord, { data, loading, error }] = useMutation(
    HEALTH_RECORD
  );
  const [complete, setComplete] = useState(false);

  const onSubmitWeightEditing = () => {
    weightInput.current?.focus();
  };
  //개체가 null에서 다른곳으로 옮겨가므로 optional caining을통해 null|값일 경우 둘다를 잡는다.
  const onSubmitHighHypertensionEditing = () => {
    highHypertensionInput.current?.focus();
  };
  const onSubmitLowHypertensionEditing = () => {
    lowHypertensionInput.current?.focus();
  };
  const onSubmitBloodSugerLevelEditing = () => {
    bloodSugerLevelInput.current?.focus();
  };

  const onComplete = () => {
    if (!complete) {
      navigation.navigate("Reminder");
      Alert.alert("적립 완료, 마이페이지에서 확인하세요");
    }
    if (complete) {
      console.error(error);
    }
  };
  const onSubmit = async () => {
    if (loading) {
      return;
    }
    try {
      setComplete(false);

      CreateHealthRecord({
        variables: {
          jwt: jwtToken,
          height: height,
          weight: weight,
          lowHypertension: lowHypertension,
          highHypertension: highHypertension,
          bloodSugarLevel: bloodSugerLevel,
        },
      });
      onComplete();
    } catch (err) {
      setComplete(true);
      Alert.alert("입력에 실패했습니다!");
    }
  };
  return (
    <Container>
      <TitleBox>
        <TitleText>건강정보 입력</TitleText>
        <BtnText>숫자만 입력해주세요</BtnText>
      </TitleBox>
      {/* <SubTitle>신체정보</SubTitle> */}
      <Inner>
        <TextInputs
          placeholder="키            cm"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          // value={String(height)}
          returnKeyType="next"
          onChangeText={(text: number) => setHeight(text)}
          onSubmitEditing={onSubmitWeightEditing}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <TextInputs
          ref={weightInput}
          placeholder="체중           kg"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          // value={String(weight)}
          returnKeyType="next"
          onChangeText={(text: number) => setWeight(text)}
          onSubmitEditing={onSubmitHighHypertensionEditing}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </Inner>
      <Inner>
        <TextInputs
          ref={highHypertensionInput}
          placeholder="최고혈압"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          // value={String(highHypertension)}
          returnKeyType="next"
          onChangeText={(text: number) => setHighHypertension(text)}
          onSubmitEditing={onSubmitLowHypertensionEditing}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <TextInputs
          ref={lowHypertensionInput}
          placeholder="최저혈압"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          // value={String(lowHypertension)}
          returnKeyType="next"
          onChangeText={(text: number) => setLowHypertension(text)}
          onSubmitEditing={onSubmitBloodSugerLevelEditing}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </Inner>
      <Inner>
        <TextInputs
          ref={bloodSugerLevelInput}
          placeholder="혈당"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          // value={String(bloodSugerLevel)}
          returnKeyType="done"
          onChangeText={(text: number) => setBloodSugerLevel(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </Inner>

      <Btn onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>입력하고 리워드 적립!</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Health;

import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { BASE_COLOR } from "../../colors";
import Multiselect from "../../src/utils/Multiselect";
import DateTime from "../../src/utils/DateTime";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../src/query/MutationQuery";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { registerActions } from "../../src/store/registerSlice";
const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 30px 20px;
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
const Btn = styled.TouchableOpacity`
  margin-top: 0px;
  width: 60%;
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
const Register = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value)
  const navigation = useNavigation();
  const passwordInput = useRef();
  const emailInput = useRef();
  const passwordCheckInput = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState([]);
  const [Signup, { data, loading, error }] = useMutation(SIGN_UP);
  const [complete, setComplete] = useState(false);
  const onSubmitEmailEditing = () => {
    emailInput.current.focus(); //유저가 입력이 끝나면 다음칸으로가게함
  };
  const onSubmitPasswordEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordCheckEditing = () => {
    passwordCheckInput.current.focus();
  };
  const onComplete = () => {
    if (!complete) {
      navigation.navigate("Login");
      Alert.alert("Account created! Log in now");
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
      console.log(
        name,
        value,
        typeof name,
        email,
        password,
        phoneNumber,
        "검증"
      );
      console.log(birth, typeof birth, "생일");
      Signup({
        variables: {
          nickname: name,
          email: email,
          dateOfBirth: birth,
          password: password,
          phoneNumber: phoneNumber,
          disease: value,
        },
      });
      onComplete();
      dispatch(registerActions.setNickName(name));
      dispatch(registerActions.setDateOfBirth(birth));
      dispatch(registerActions.setPhoneNumber(phoneNumber));
    } catch (err) {
      console.log(err.stack);
      setComplete(true);
      Alert.alert("회원가입에 실패했습니다!");
    }
  };
  return (
    <Container>
      <TextInputs
        placeholder="이름"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={name}
        returnKeyType="next"
        onChangeText={(text) => setName(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={emailInput}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitPasswordEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordCheckEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordCheckInput}
        placeholder="PasswordCheck"
        secureTextEntry
        value={passwordCheck}
        returnKeyType="next"
        onChangeText={(text) => setPasswordCheck(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        placeholder="PhoneNumber"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        value={phoneNumber}
        returnKeyType="done"
        onChangeText={(text) => setPhoneNumber(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />

      <DateTime text={birth} onChangeText={setBirth} />
      <Multiselect value={value} setValue={setValue} />
      <Btn onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>아이디 생성!</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Register;

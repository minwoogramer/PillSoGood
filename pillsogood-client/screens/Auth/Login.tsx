import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import { useMutation, gql, useQuery } from "@apollo/client";
import { LOGIN } from "../../src/query/MutationQuery";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../src/store/loginSlice";
import { useNavigation } from "@react-navigation/native";
import { GetFCMToken } from "../../src/utils/Pushnotification";
import { RootState } from "../../src/store";
import { LoginScreenProps } from "../../src/models/Auth.model";

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 60px 20px;
`;
const TitleText = styled.Text`
  color: #202d35;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
`;
const LoginBtn = styled.TouchableOpacity`
  margin-top: 50px;
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
const Wrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
`;
const Btn = styled.TouchableOpacity``;
const BtnTxt = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: 600;
`;

const Login: React.FC<LoginScreenProps> = (props) => {
  useEffect(() => {
    GetFCMToken();
  }, []);
  let { navigation } = props;
  let state = useSelector((state: RootState) => state.login); //redux store??? state????????????
  const dispatch = useDispatch();
  //???????????? state= store?????? ?????? ?????? state
  // let dispatch = useDispatch(); //store.js??? ?????? ???????????? ??????
  //dispatch(addUser())
  const passwordInput = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleClick = async () => {
    let Token;
    let fcmToken = await AsyncStorage.getItem("fcmtoken");
    console.log(email, password, fcmToken, "????????? ?????????");
    const loginVariables = login({
      variables: {
        email: email,
        password: password,
        firebaseToken: fcmToken,
      },
    });
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) return "????????????...";
    if (error) return `????????? ????????????! ${error.message}`;
    loginVariables.then((appdata) => {
      if (!appdata.data.login.jwt) {
        Alert.alert("????????? ?????? ??????????????? ?????? ????????????.");
      } else {
        Alert.alert("???????????????");
        setEmail("");
        setPassword("");
        AsyncStorage.setItem("token", appdata.data.login.jwt); //????????? jwt ?????? ??????
        Token = appdata.data.login.jwt;

        dispatch(loginActions.setNickname(appdata.data.login.nickname));
        console.log(appdata.data.login, "appdata");
        dispatch(loginActions.setToken(Token)); //?????? state??? jwt??????
        navigation.navigate("Tabs"); //??????????????? ??? Home?????? ??????
      }
    });
  };

  const onSubmitEmailEditing = () => {
    passwordInput.current?.focus();
  };

  return (
    <Container>
      <TitleText>Login</TitleText>
      <TextInputs
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text: string) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text: string) => setPassword(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Wrapper>
        <Text>Don't have an account? </Text>
        <Btn onPress={() => navigation.navigate("Register")}>
          <BtnTxt>Register &rarr;</BtnTxt>
        </Btn>
      </Wrapper>
      <LoginBtn>
        <BtnText onPress={() => handleClick()}>?????????!</BtnText>
      </LoginBtn>
    </Container>
  );
};
export default Login;

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

const Login = ({ navigation: { navigate } }) => {
  useEffect(() => {
    GetFCMToken();
  }, []);
  const navigation = useNavigation();
  let state = useSelector((state) => state.login); //redux store의 state꺼내는법
  const dispatch = useDispatch();
  //참고사항 state= store안에 있는 모든 state
  console.log(state.user); //obj자료형에서 꺼내는방법
  // let dispatch = useDispatch(); //store.js로 요청 보내주는 함수
  //dispatch(addUser())
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleClick = async () => {
    let Token;
    let fcmToken = await AsyncStorage.getItem("fcmtoken");
    console.log(email, password, fcmToken, "로그인 데이터");
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
    if (loading) return "로그인중...";
    if (error) return `로그인 에러발생! ${error.message}`;
    loginVariables.then((appdata) => {
      if (!appdata.data.login.jwt) {
        Alert.alert("아이디 혹은 비밀번호가 맞지 않습니다.");
      } else {
        Alert.alert("로그인완료");
        setEmail("");
        setPassword("");
        AsyncStorage.setItem("token", appdata.data.login.jwt); //로컬에 jwt 토큰 저장
        Token = appdata.data.login.jwt;

        dispatch(loginActions.setNickname(appdata.data.login.nickname));
        console.log(appdata.data.login, "appdata");
        dispatch(loginActions.setToken(Token)); //전역 state에 jwt저장
        navigation.navigate("Tabs"); //로그인완료 후 Home으로 이동
      }
    });
  };

  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
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
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Wrapper>
        <Text>Don't have an account? </Text>
        <Btn onPress={() => navigate("Register")}>
          <BtnTxt>Register &rarr;</BtnTxt>
        </Btn>
      </Wrapper>
      <LoginBtn>
        <BtnText onPress={() => handleClick()}>로그인!</BtnText>
      </LoginBtn>
    </Container>
  );
};
export default Login;

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-web-swiper";
import { BASE_COLOR } from "../../../colors";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  USERQUERY,
  UserMutation,
  CharQuery,
  CharSubmit,
} from "../../../src/query/MutationQuery";
import { RootState } from "../../../src/store";

// 0번째 이슈 : 이미지 뽑고 나서 단일 이미지만 보여야 하는데 여러 이미지가 같이 보임 ---- 대충 해결? random Num이 9까지 생성되는데 샘플 리스트는 9미만 이엇음
// 1번째 이슈 : result에 배열을 담아와도 maps를 사용 못함. 직접 변수 list를 선언하여 maps를 돌릴 때는 정상 진행; --- 해결. Loading 순서 바뀜
// 2. 캐릭터 뽑으면 해당 url을 서버에 mutation 요청 필요.
// 3. refresh시 화면 초기화 모든 기능 초기화 필요
// 4. CSS 꾸미기
// 5. Code refactoring

// +@ 선택된 캐릭터들은 캐릭터 목록 리스트에서 제거되어야 함..

// 7/25 이슈 및 구현 필요사항
// 1.setRandomImg 먹통
// 2. Nft.storage 사용 불가 . Pinata ? --- node.js 환경에서 사용 가능.. 즉슨 서버쪽에서 구현 필요?
// 3. 작명하기 버튼 클릭시 서버에 mutation 필요
// 4. css 수정

// 해야할 것 :
// 1. Mutation
// 2. CSS

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BASE_COLOR};
`;

const Container = styled.ScrollView`
  background-color: ${BASE_COLOR};
`;

const HeaderView = styled.View`
  background-color: #fefbea;
  flex: 1;
`;
const Header = styled.Text`
  color: #696969;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 22px;
  margin-bottom: 22px;
  text-align: center;
  font-weight: 900;
  text-shadow: 1px 1px 2px papayawhip;
`;

const View = styled.View`
  flex: 1;
  border: 2px solid;
  border-color: #99c49e;
`;

const BgImg = styled.Image`
  flex: 1;
`;

const MidView = styled.View`
  background-color: #ffffed;
  flex: 1;
  border: 1px solid;
  border-color: #8fc9a3;
  border-radius: 3px;
`;

const MidText = styled.Text`
  margin-top: 40px;
  margin-bottom: 30px;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: #696969;
  font-weight: 600;
  text-shadow: 1px 1px 2px papayawhip;
`;

const Button = styled.TouchableOpacity`
  margin-top: 30px;
  width: 40%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  margin-left: 120px;
  background-color: grey;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

const BtnView = styled.View`
  flex: 1;
  justify-content: center;
`;

const Text1View = styled.View`
  flex: 1;
  background-color: #ffffff7f;
`;
const Text1 = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  color: #696969;
  font-weight: 600;
  text-shadow: 1px 1px 2px papayawhip;
`;

const Text2View = styled.View`
  flex: 1;
  background-color: #fefbea;
`;

const Text2 = styled.Text`
  margin-top: 20px;
  margin-bottom: 30px;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  color: #696969;
`;
const Bgimg2View = styled.View`
  flex: 1;
`;

const BgImg2 = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;

const TextInputView = styled.View`
  margin-top: 30px;
  align-items: center;
`;

const TextInputs = styled.TextInput`
  width: 90%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const RandomCharacter = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [draw, setDraw] = useState(false);
  const [randomImg, setRandomImg] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bal, setBal] = useState("");
  const jwt = useSelector((state: RootState) => state.login.token);

  const { data } = useQuery(USERQUERY, { variables: { jwt: jwt } });

  const [userMutation] = useMutation(UserMutation);
  // const charQuery = useQuery(CharQuery);
  const [charSubmit] = useMutation(CharSubmit);

  // 뽑을 캐릭터 리스트 가져오는 함수
  const getImage2 = async () => {
    const res = await fetch(
      "https://gateway.pinata.cloud/ipfs/QmfExvMdoWcQMNihsexYLfaCaGGQjFw851NiFwn1Hy9LaK"
    );
    const json = await res.json();
    setResult(json);
    setLoading(false);
  };

  useEffect(() => {
    getImage2();
    console.log("useEffect data :", data);
    if (data !== undefined) {
      const balance = data.getUserInfo.pointBalance;
      setBal(balance);
    }
  }, [data]);

  // 뽑기 함수
  const Draw = () => {
    // 버튼 누르면 로딩 애니메이션 뜨고 3초 뒤에 랜덤 뽑기 실행
    if (bal < 100) {
      Alert.alert("캐릭터를 뽑으시려면 100포인트를 모으세요!");
    } else {
      // 1.충분한 포인트 있으면 서버에 point 차감 update mutation 전송   // 2. 캐릭터 생성
      const updateBal = bal - 100;
      setBal(updateBal);
      userMutation({
        variables: {
          jwt: jwt,
          pointBalance: updateBal,
        },
      }).then((res) => console.log("업데이트 성공 :", res));
      setDraw(true);
      console.log(draw);
      try {
        setTimeout(() => {
          // 3초 뒤 랜덤 뽑기 실행
          // URL에서 받아온 이미지 데이터의 랜덤 인덱스값으로 RandomImg값 변경
          const randomNumber = Math.floor(Math.random() * 10); // 10 이하의 랜덤 넘버 생성. 인덱스로 들어갈 예정
          const pic = result[randomNumber];
          setRandomImg([pic]);
          Alert.alert(" 캐릭터를 뽑았습니다!");
        }, 3000);
      } catch (e) {
        console.error(e);
      }
      //3초 동안 로딩 이미지 보여주어야 함
      // 서버에 mutation 요청 필요
      // 성공 alert 떠야됨
    }
  };

  // nft 발행 함수
  const Submit = () => {
    setLoading(true);
    charSubmit({
      variables: {
        jwt: jwt,
        name: name,
        description: description,
        baseId: randomImg[0],
      },
    }).then((res) => {
      setLoading(false);
      if (res) {
        console.log("발행 성공 :", res);
        Alert.alert("캐릭터를 생성했습니다!");
      } else {
        console.log("발행 실패 :", res);
        Alert.alert("캐릭터 생성이 실패했습니다");
      }
    });
    setName("");
    setDescription("");
  };

  // 새로고침 함수
  const onRefresh = () => {
    setRefreshing(true);
    setDraw(false);
    setRefreshing(false);
    setRandomImg([]);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : randomImg.length === 0 ? (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <HeaderView>
        <Header> 캐릭터 리스트 </Header>
      </HeaderView>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
      >
        {result.map((img, index) => (
          <View key={index}>
            <BgImg style={StyleSheet.absoluteFill} source={{ uri: img }} />
          </View>
        ))}
      </Swiper>

      {draw === false ? (
        <MidView>
          <MidText>마일리지 : {bal} </MidText>
        </MidView>
      ) : (
        <Swiper
          loop
          timeout={0.1}
          controlsEnabled={false}
          containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
        >
          {result.map((img, index) => (
            <View key={index}>
              <BgImg source={{ uri: img }} />
            </View>
          ))}
        </Swiper>
      )}
      <BtnView>
        <Button>
          <BtnText onPress={Draw}>뽑기</BtnText>
        </Button>
      </BtnView>
    </Container>
  ) : (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <Text1View>
        <Text1>당신의 캐릭터를 환영해주세요</Text1>
      </Text1View>
      <Text2View>
        <Text2>
          캐릭터를 다시 뽑으시려면 화면을 스크롤해 새로고침 해주세요
        </Text2>
      </Text2View>
      <Bgimg2View>
        <BgImg2 source={{ uri: randomImg[0] }} />
      </Bgimg2View>
      <TextInputView>
        <TextInputs
          placeholder="캐릭터 이름을 지어주세요"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          value={name}
          returnKeyType="next"
          onChangeText={(text) => setName(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <TextInputs
          placeholder="간단한 설명을 입력해주세요"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          value={description}
          returnKeyType="next"
          onChangeText={(text) => setDescription(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </TextInputView>

      <Button>
        <BtnText onPress={Submit}>생성하기</BtnText>
      </Button>
    </Container>
  );
};

export default RandomCharacter;

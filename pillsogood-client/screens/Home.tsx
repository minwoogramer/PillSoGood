import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_MEDICINE_ALARM,
  POST_MEDICINE_RECORD,
} from "../src/query/MutationQuery";
import { useSelector } from "react-redux";
// import { set } from "immer/dist/internal";
import { Alert, Text, View, FlatList, Modal } from "react-native";
const moment = require("moment");
import "moment/locale/ko";
import { RootState } from "../src/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigators/Stack/HomeStackScreen";
import { HomeStackScreenProps } from "../src/models/Home.model";
const Container = styled.SafeAreaView`
  background-color: ${BASE_COLOR};
  flex: 1;
  color: black;
  padding: 0px 20px;
`;
const Birds = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 5px;
  margin: 5px;
  background-color: transparent;
  justify-content: space-between;
`;
const HeadTxt = styled.Text`
  color: #76a991;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 1px 3px 3px white;
`;
const MainTxt = styled.Text`
  color: "#202d35";
  font-size: 15px;
  padding-left: 10px;
  margin-top: -15px;
`;
const Card = styled.View`
  flex: 1;
  padding: 23px;
  margin: 10px 0px;
  background: papayawhip;
  border-radius: 20px;
  border-width: 3px;
  border-color: "rgba(255, 255, 255, 0.7)";
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Cardtxt = styled.Text`
  color: black;
  font-weight: 600;
  font-size: 17px;
`;
const CardElementContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
const Btn = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 17px;
`;
const AlarmBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: #76a991;
  align-items: center;
  justify-content: center;
  bottom: 10;
  left: 20;
  position: absolute;
`;
const AlarmText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;
const CardContainer = styled.View``;

const Home: React.FC<HomeStackScreenProps> = (props) => {
  let { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  let jwtToken = useSelector((state: RootState) => state.login.token);
  const [clicked, setClicked] = useState(false);
  //Query
  const [RefreshDataFetch, { data, loading, error, refetch }] = useLazyQuery(
    GET_MEDICINE_ALARM,
    {
      variables: {
        jwt: jwtToken,
      },
      pollInterval: 500,
    }
  );
  //Mutation

  const getRefreshData = async () => {
    setRefreshing(true);
    await RefreshDataFetch();
    setRefreshing(false);
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };
  const onEndReached = () => {
    if (!loading) {
      refetch;
    }
  };
  const renderData = data?.getPrescriptionRecords;
  console.log(renderData);
  useEffect(() => {
    refetch;
  }, [data]);
  const [createMedicationRecord] = useMutation(POST_MEDICINE_RECORD);

  console.log(data);
  return (
    <Container>
      <View>
        <Header>
          <HeadTxt>Pill So Good</HeadTxt>
          <Birds source={require("../src/assets/highland.jpg")} />
        </Header>
        <View>
          <MainTxt>
            현재시간:{moment(new Date()).format(" hh:mm a dddd ")}
          </MainTxt>
        </View>
      </View>
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card>
            <CardElementContainer>
              <CardContainer>
                <Cardtxt>약 이름: {item.medicine}</Cardtxt>
                <Cardtxt>남은약 개수: {item.lastMedicationCount}</Cardtxt>
                <Cardtxt>약 먹는 시간: {item.alertTime}</Cardtxt>
              </CardContainer>
              {console.log(item, "itemssssssss")}
              <Btn
                onPress={() => {
                  setClicked(true);
                  createMedicationRecord({
                    variables: {
                      jwt: jwtToken,
                      medicine: item.medicine,
                      condition: "건강함",
                    },
                  });
                  Alert.alert("10Coins 획득!");
                }}
              >
                <BtnText>확인</BtnText>
              </Btn>
            </CardElementContainer>
          </Card>
        )}
        keyExtractor={(item: {
          alertTime: number;
          lastMedicationCount: number;
          medicine: string;
          _id: string;
        }) => item._id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
      />
      <AlarmBtn onPress={() => navigation.navigate("Reminder")}>
        <AlarmText>알람 등록하기</AlarmText>
      </AlarmBtn>
    </Container>
  );
};

export default Home;

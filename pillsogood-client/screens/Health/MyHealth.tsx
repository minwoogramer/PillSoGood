import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import { useSelector } from "react-redux";
import { Alert, Dimensions } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryPortal,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 0px 20px;
`;
const HeadWapper = styled.View`
  flex: 0.3;
  margin-top: 10px;
  background-color: #76a991;
  border-radius: 20px;
  width: ${SCREEN_WIDTH * 0.7};
  align-items: center;
`;

const HeaderTxt = styled.Text`
  margin-top: 15px;
  color: white;
  font-size: 25px;
  font-weight: bold;
`;
const MyHealth = () => {
  return (
    <Container>
      <HeadWapper>
        <HeaderTxt>내 건강정보</HeaderTxt>
      </HeadWapper>
      <VictoryChart domainPadding={30} style={{ marginTop: 700 }}>
        <VictoryStack
          colorScale={["gold", "orange", "tomato"]}
          style={{
            data: { width: 30 },
            labels: { padding: -20 },
          }}
          labelComponent={
            <VictoryPortal>
              <VictoryLabel />
            </VictoryPortal>
          }
        >
          <VictoryBar
            data={[
              { x: 1, y: 3, label: "C" },
              { x: 2, y: 4, label: "C" },
              { x: 3, y: 2, label: "C" },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3, label: "B" },
              { x: 2, y: 4, label: "B" },
              { x: 3, y: 2, label: "B" },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3, label: "A" },
              { x: 2, y: 4, label: "A" },
              { x: 3, y: 2, label: "A" },
            ]}
          />
        </VictoryStack>
        <VictoryAxis />
      </VictoryChart>
    </Container>
  );
};
1;
export default MyHealth;

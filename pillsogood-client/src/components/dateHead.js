import React from 'react'
import styled from "styled-components/native";

const Container = styled.View`
    background-color: "#FDE0BC";
    color: black;
    padding: 16px;

`;
const MainTxt = styled.Text`
    color: black;
    font-size: 12px;
`;

function dateHead({date}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatted = `${year}년 ${month}월 ${day}일`;

    return (
        <Container>
            <MainTxt>{ formatted }</MainTxt>
        </Container>
        )
}

export default dateHead

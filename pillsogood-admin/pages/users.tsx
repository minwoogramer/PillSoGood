import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { PageTitle } from "../components/PageTitle"
import { StyledTable, StyledTh, StyledTd, StyledTr, StyledNewButtonDiv, StyledNewButton } from "../components/StyledTable"
import { StyledLoadingGif } from "../components/StyledCommon"
import React from "react";
import { CSVLink } from "react-csv";
import moment from "moment"
import { DISEASE } from '../constants/disease';
import { useExcelDownloder } from 'react-xls';

const headers = [
    { label: "no.", key: "no"},
    { label: "email", key: "email"},
    { label: "이름", key: "nickname"},
    { label: "생년월일", key: "dateOfBirth"},
    { label: "포인트 잔액", key: "pointBalance"},
    { label: "가입 일자", key: "createdAt"},
    { label: "질환", key: "disease"},
    { label: "전화 번호", key: "phoneNumber"},
]

const GET_USERS = gql`
    query GetUsers($jwt: String!, $nickname: String, $email: String) {
        getUsers(jwt: $jwt, nickname: $nickname, email: $email) {
            _id
            email
            nickname
            dateOfBirth
            pointBalance
            createdAt
            disease
            phoneNumber
        }
    }
`

function getDiseaseKorean(disease:[]) {
    let diseaseKorean = ""
    for (let i = 0; i < disease.length; i++) {
        diseaseKorean += DISEASE[i]
        if(i !== (disease.length - 1)) {
            diseaseKorean += ", "
        }
    }
    return diseaseKorean;
}

const Users: NextPage = () => {
    const { ExcelDownloder, Type } = useExcelDownloder();

    const { loading, data } = useQuery(
        GET_USERS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        <StyledLoadingGif/>
    }
    if (data) {
        var excelData = []
        var koreanLabelData = []

        for (let i = 0; i< data.getUsers.length; i++) {
            let user = data.getUsers[i]
            let userExcelData = {
                no: i+1,
                email: user.email, 
                nickname: user.nickname, 
                dateOfBirth: user.dateOfBirth, 
                pointBalance: user.pointBalance, 
                createdAt: user.createdAt, 
                disease: getDiseaseKorean(user.disease), 
                phoneNumber:user.phoneNumber
            }
            excelData.push(userExcelData)
            let labelData = {
                "no.": i+1,
                "email": user.email, 
                "이름": user.nickname, 
                "생년월일": user.dateOfBirth, 
                "포인트 잔액": user.pointBalance, 
                "가입 일자": user.createdAt, 
                "질환": getDiseaseKorean(user.disease), 
                "전화 번호":user.phoneNumber
            }
            koreanLabelData.push(labelData)
        }

        const xlsxData = {
            users: koreanLabelData
        };

        return (
            <div>
                <PageTitle title="사용자 목록"/>
                <StyledNewButtonDiv>
                    <ExcelDownloder data={xlsxData} filename={`${moment().format("yyyyMMDD")}_사용자목록`}>
                        <StyledNewButton style={{marginRight:10}}>.xlsx 다운로드</StyledNewButton>
                    </ExcelDownloder>
                    <CSVLink data={excelData} headers={headers} filename={ `${moment().format("yyyyMMDD")}_사용자목록.csv`}>
                        <StyledNewButton>.csv 다운로드</StyledNewButton>
                    </CSVLink>
                </StyledNewButtonDiv>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh scope="col">닉네임</StyledTh>
                            <StyledTh scope="col">이메일</StyledTh>
                            <StyledTh scope="col">전화 번호</StyledTh>
                            <StyledTh scope="col">생년월일</StyledTh>
                            <StyledTh scope="col">리워드</StyledTh>
                            <StyledTh scope="col">질환</StyledTh>
                            <StyledTh scope="col">가입 일자</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getUsers.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/users/${data._id}`}>
                                        <tr>
                                            <StyledTd>{data.nickname}</StyledTd>
                                            <StyledTd>{data.email}</StyledTd>
                                            <StyledTd>{data.phoneNumber}</StyledTd>
                                            <StyledTd>{data.dateOfBirth}</StyledTd>
                                            <StyledTd>{data.pointBalance}</StyledTd>
                                            <StyledTd>{getDiseaseKorean(data.disease)}</StyledTd>
                                            <StyledTd>{data.createdAt}</StyledTd>
                                        </tr>
                                    </Link>
                                )
                            })
                        }
                    </tbody>
                </StyledTable>
            </div>
        )
    } else {
        return (
            <StyledLoadingGif/>
        )
    }
}

export default Users
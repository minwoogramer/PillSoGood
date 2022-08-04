
import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import { PageTitle } from '../components/PageTitle';
import { StyledTable, StyledTh, StyledTd, StyledTr } from "../components/StyledTable"
import { StyledLoadingGif } from "../components/StyledCommon"
import React from "react";

const GET_ADMINS = gql`
    query GetAdmins($jwt: String!) {
        getAdmins(jwt: $jwt) {
            _id
            name
            email
            createdAt
        }
    }
`

const Admins: NextPage = () => {
    const { loading, data } = useQuery(
        GET_ADMINS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<StyledLoadingGif/>)
    }
    if (data) {
        return (
            <div>
                <PageTitle title="관리자 목록"/>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh>이름</StyledTh>
                            <StyledTh>이메일</StyledTh>
                            <StyledTh>생성 일자</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getAdmins.map((data:any, index:number) => {
                                return (
                                    <tr key={index}>
                                        <StyledTd>{data.name}</StyledTd>
                                        <StyledTd>{data.email}</StyledTd>
                                        <StyledTd>{data.createdAt}</StyledTd>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </StyledTable>
            </div>
        )
    }
    return (
        <StyledLoadingGif/>
    )

}

export default Admins
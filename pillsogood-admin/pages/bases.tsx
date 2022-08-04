import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { useRouter } from 'next/router';
import { PageTitle } from "../components/PageTitle"
import { StyledNewButton } from "../components/StyledTable"
import { StyledTable, StyledTh, StyledTd, StyledTr, StyledNewButtonDiv } from "../components/StyledTable"
import React from "react";
import { StyledLoadingGif } from "../components/StyledCommon"

const GET_BASES = gql`
    query GetBases($jwt: String!) {
            getBases(jwt: $jwt) {
                _id
                name
                level
                imagePath
        }
    }
`

const Bases: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_BASES,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<StyledLoadingGif/>)
    }
    if (data) {
        return (
            <div>
                <PageTitle title="기본 캐릭터 목록"/>
                <StyledNewButtonDiv>
                    <StyledNewButton type="button" onClick={() => router.push("/bases/new")}>등록</StyledNewButton>
                </StyledNewButtonDiv>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh>이름</StyledTh>
                            <StyledTh>레벨</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getBases.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/bases/${data._id}`}>
                                        <tr>
                                            <StyledTd>{data.name}</StyledTd>
                                            <StyledTd>{data.level}</StyledTd>
                                        </tr>
                                    </Link>
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

export default Bases
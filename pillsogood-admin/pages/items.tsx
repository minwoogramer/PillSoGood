import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { useRouter } from 'next/router';
import { PageTitle } from "../components/PageTitle"
import { StyledTable, StyledTh, StyledTd, StyledTr, StyledNewButton, StyledNewButtonDiv } from "../components/StyledTable"
import React from "react";
import { StyledLoadingGif } from "../components/StyledCommon"

const GET_ITEMS = gql`
    query GetItems($jwt: String!) {
        getItems(jwt: $jwt) {
            _id
            name
            type
            imagePath
    }
}
`

const Items: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_ITEMS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<StyledLoadingGif/>)
    }
    if (data) {
        return (
            <div>
                <PageTitle title="아이템 목록"/>
                <StyledNewButtonDiv>
                    <StyledNewButton type="button" onClick={() => router.push("/items/new")}>등록</StyledNewButton>
                </StyledNewButtonDiv>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh scope="col">이름</StyledTh>
                            <StyledTh scope="col">타입</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getItems.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/items/${data._id}`}>
                                        <tr>
                                            <StyledTd>{data.name}</StyledTd>
                                            <StyledTd>{data.type}</StyledTd>
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

export default Items
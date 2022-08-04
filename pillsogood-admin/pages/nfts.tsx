import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import { useRouter } from 'next/router';
import { PageTitle } from "../components/PageTitle"
import { StyledTable, StyledTh, StyledTd, StyledTr } from "../components/StyledTable"
import React from "react";
import { StyledLoadingGif } from "../components/StyledCommon"

const GET_ALL_NFTS = gql`
    query GetAllNfts($jwt: String!) {
        getAllNfts(jwt: $jwt) {
            _id
            nftHash
            imagePath
            tokenId
            user {
            _id
            email
            nickname
            dateOfBirth
            pointBalance
            createdAt
            phoneNumber
            }
        }
    }
`

const Nfts: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_ALL_NFTS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<StyledLoadingGif/>)
    }
    if (data) {
        return (
            <div>
                <PageTitle title="NFT 목록"/>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh scope="col">닉네임</StyledTh>
                            <StyledTh scope="col">이메일</StyledTh>
                            <StyledTh scope="col">전화번호</StyledTh>
                            <StyledTh scope="col">NFT Hash</StyledTh>
                            <StyledTh scope="col">Token Id</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getAllNfts.map((data:any) => {
                                return (
                                    <tr key={data._id}>
                                        <StyledTd>{data.user.nickname}</StyledTd>
                                        <StyledTd>{data.user.email}</StyledTd>
                                        <StyledTd>{data.user.phoneNumber}</StyledTd>
                                        <StyledTd>{data.nftHash}</StyledTd>
                                        <StyledTd>{data.tokenId}</StyledTd>
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

export default Nfts
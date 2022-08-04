import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { PageTitle } from "../components/PageTitle"
import React from "react";
import { StyledForm, StyledLabel, StyledInput, StyledItemDiv, StyledButtonDiv, StyledMain } from "../components/StyledForm"
import { StyledSubmitButton, StyledBackButton } from '../components/StyledCommon';

const JOIN_ADMIN = gql`
mutation JoinAdmin($email: String!, $name: String!, $password: String) {
    joinAdmin(email: $email, name: $name, password: $password)
}
`;

const Join: NextPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [joinAdmin, { data, loading, error }] = useMutation(JOIN_ADMIN, {
        onCompleted: (data) => {
            if(data.joinAdmin === 200) router.push("/login");
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        joinAdmin({
            variables: {
                email: email,
                password: password,
                name: name
            }
        })
    };

    return (
        <div>
            <PageTitle title="관리자 등록"/>
            <StyledMain>
                <StyledForm>
                    <StyledItemDiv>
                        <StyledLabel>이메일</StyledLabel>
                        <StyledInput type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </StyledItemDiv>
                    <StyledItemDiv>
                        <StyledLabel>비밀번호</StyledLabel>
                        <StyledInput type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </StyledItemDiv>
                    <StyledItemDiv>
                        <StyledLabel>이름</StyledLabel>
                        <StyledInput type="text" onChange={(e) => {setName(e.target.value)}}/>
                    </StyledItemDiv>
                    <StyledButtonDiv>
                        <StyledSubmitButton type="submit" onClick={(e) => onSubmit(e)}>등록</StyledSubmitButton>
                        <StyledBackButton type="button" onClick={() => router.back()}>취소</StyledBackButton> 
                    </StyledButtonDiv>
                </StyledForm>
            </StyledMain>
        </div>
    )
}

export default Join
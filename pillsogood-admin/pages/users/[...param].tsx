import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"
import { useState } from "react"
import { PageTitle } from "../../components/PageTitle"
import { StyledForm, StyledInput, StyledLabel, StyledSpan, StyledItemDiv, StyledButtonDiv, StyledEyeButton, StyledMain } from "../../components/StyledForm"
import { StyledSubmitButton, StyledBackButton } from "../../components/StyledCommon"
import React from "react";
import { StyledLoadingGif } from "../../components/StyledCommon"

const GET_USER_INFO = gql`
    query GetUserInfo($jwt: String!, $id: String) {
        getUserInfo(jwt: $jwt, _id: $id) {
            _id
            email
            password
            nickname
            dateOfBirth
            pointBalance
            createdAt
            disease
            phoneNumber
    }
}
`

const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword($jwt: String!, $id: String!, $password: String) {
        updateUserPassword(jwt: $jwt, _id: $id, password: $password)
    }
`;

export async function getServerSideProps(context:any) {
    const userId = context.query.param[0]
    return {
      props: {userId: userId}
    };
}
  

const UserDetail = (props:any)=> {
    const [password, setPassword] = useState('')
    const router = useRouter()
    
    var [updateUserPassword, { data, loading, error }] = useMutation(UPDATE_USER_PASSWORD, {
        onCompleted: (result) => {
            alert("변경되었습니다.")
            router.back()
        },
        onError:(error) => {
            console.log(error)
        }
    })

    var { loading, data } = useQuery(
        GET_USER_INFO,
        { variables: { jwt: SessionStorage.getItem("jwt"), id:props.userId } }
    );

    while (loading) {
        return (<StyledLoadingGif/>)
    }

    const userInfo = data.getUserInfo

    const onSubmit = (e: any) => {
        e.preventDefault();
        updateUserPassword({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:props.userId,
                password:password
            }
        })
    };

    if(data) {
        return (
            <div>
                <PageTitle title="사용자 상세 정보"/>
                <StyledMain>
                    <StyledForm>
                        <StyledItemDiv>
                            <StyledLabel>닉네임</StyledLabel>
                            <StyledSpan>{userInfo.nickname}</StyledSpan>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>생년월일</StyledLabel>
                            <StyledSpan>{userInfo.dateOfBirth}</StyledSpan>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>리워드 잔액</StyledLabel>
                            <StyledSpan>{userInfo.pointBalance}</StyledSpan>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>전화 번호</StyledLabel>
                            <StyledSpan>{userInfo.phoneNumber}</StyledSpan>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>가입 일자</StyledLabel>
                            <StyledSpan>{userInfo.createdAt}</StyledSpan>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>새 비밀번호</StyledLabel>
                            <StyledInput type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                            <StyledEyeButton type="button" onMouseDown={() => document.querySelector('#password')!.setAttribute('type', 'text')} 
                                onMouseUp={() => document.querySelector('#password')!.setAttribute('type', 'password')}>
                                    <img id="eye" src="/eye-default.png" width="30px;" onMouseDown={() => document.querySelector("#eye")!.setAttribute('src', '/eye-show.png')}
                                        onMouseUp={() => document.querySelector("#eye")!.setAttribute('src', '/eye-default.png')}/>
                                </StyledEyeButton>
                        </StyledItemDiv>
                        <StyledButtonDiv>
                            <StyledBackButton type="button" onClick={() => router.back()}>목록으로</StyledBackButton>
                            <StyledSubmitButton type="submit" onClick={(e) => onSubmit(e)}>비밀번호 변경</StyledSubmitButton>
                        </StyledButtonDiv>
                    </StyledForm>
                </StyledMain>
            </div>
        )
    }
    return (
        <StyledLoadingGif/>
    )
}

export default UserDetail
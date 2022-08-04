import styled from "styled-components"
import { useRouter } from "next/router";
import SessionStorage from "../utils/sessionStorage"
import React from "react"

const logout = () => {
    SessionStorage.removeItem("jwt")
    window.location.href = "/login"
}

const StyledNavBar = styled.div`
    height: 50px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
`

const StyledNavBarItem = styled.span`
    line-height: 50px;
    margin-right: 20px;
    font-size: 20px;
    color: #6c757d;
`

export const StyledLogoutButton = styled.button`
    float: right;
    margin-top: 1%;
    background-color:transparent;
    border: 0;
    outline: 0;
    vertical-align:middle;
`

export const NavBar = () => {
    const router = useRouter()
    return (
        <StyledNavBar>
            <StyledNavBarItem onClick={() => router.push("/")}>대시보드</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/users")}>사용자 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/bases")}>기본 캐릭터 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/items")}>아이템 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/nfts")}>NFT 목록 (보수중)</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/characters")}>사용자 캐릭터 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/admins")}>관리자 목록</StyledNavBarItem>
            <StyledLogoutButton onClick={() => logout()}><img src="/logout.png"  style={{width:30, height:30}}/></StyledLogoutButton>
        </StyledNavBar>
    )
}
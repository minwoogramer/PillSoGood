import styled from "styled-components";
import React from "react"

const StyledH1Title = styled.h1`
    text-align: center;
    padding-bottom: 5px;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
    border-bottom: 1px solid #000000;
`

export const PageTitle = (props:{title:string}) => {
    return (
        <StyledH1Title>{props.title}</StyledH1Title>
    )
}
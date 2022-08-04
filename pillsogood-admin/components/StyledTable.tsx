import styled from "styled-components";

export const StyledTable = styled.table`
    width: 80%;
    padding: 10px 0;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
`

export const StyledTr = styled.tr`
`

export const StyledTh = styled.th`
    text-align: center;
    font-weight: 500;
    color: #ffffff;
    padding: 5px 0;
    background-color: #5c5c5c;
`

export const StyledTd = styled.td`
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid #B5B5B5;
`

export const StyledNewButtonDiv = styled.div`
    text-align: right;
    margin-right: 10%;
    margin-bottom: 1%;
`

export const StyledNewButton = styled.button`
    --bs-btn-padding-y: 0.5rem;
    --bs-btn-padding-x: 1rem;
    --bs-btn-font-size: 1.25rem;
    --bs-btn-border-radius: 0.5rem;
    --bs-btn-color: #fff;
    --bs-btn-bg: #6c757d;
    --bs-btn-border-color: #6c757d;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #5c636a;
    --bs-btn-hover-border-color: #565e64;
    --bs-btn-focus-shadow-rgb: 130,138,145;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #565e64;
    --bs-btn-active-border-color: #51585e;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #6c757d;
    --bs-btn-disabled-border-color: #6c757d;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`
import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"
import { useState } from "react"
import axios from "axios"
import { PageTitle } from "../../components/PageTitle"
import React from "react";
import { StyledLoadingGif } from "../../components/StyledCommon"
import { StyledForm, StyledLabel, StyledInput, StyledItemDiv, StyledButtonDiv, StyledMain, StyledImg } from "../../components/StyledForm"
import { StyledSubmitButton, StyledBackButton } from '../../components/StyledCommon';

const CREATE_ITEM = gql`
    mutation CreateItem($jwt: String!, $type: Int!, $name: String!, $imagePath: String!) {
        createItem(jwt: $jwt, type: $type, name: $name, imagePath: $imagePath)
    }
`

const NewItem: NextPage = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [type, setType] = useState(0)
    const [imagePath, setImagePath] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [createItem, { data, loading, error }] = useMutation(CREATE_ITEM, {
        onCompleted: (data) => {
            if(data.createItem === 200) {
                alert("등록되었습니다.")
                window.location.href = "/items"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const saveFileImage = (e:any) => {
        setImagePath(URL.createObjectURL(e.target.files[0]));
      };
    const sendFileToIPFS = async (f: any) => {
        setIsLoading(true)
        if (f) {
          const formData = new FormData();
          formData.append("file", f);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              "pinata_api_key": `${process.env.PINATA_API_KEY}`,
              "pinata_secret_api_key": `${process.env.PINATA_API_SECRET_KEY}`,
              "Content-Type": "multipart/form-data"
            },
          });
          const imageHash = `https://ipfs.moralis.io:2053/ipfs/${resFile.data.IpfsHash}`;
          setImagePath(imageHash);
          setIsLoading(false)
        }
      };
    const onSubmit = (e: any) => {
        if(!confirm("등록하시겠습니까?")) return
        e.preventDefault();
        createItem({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                name:name,
                imagePath:imagePath,
                type:type
            }
        })
    };
    return (
        <div>
                <PageTitle title="새 아이템 등록"/>
                <StyledMain>
                    <StyledForm>
                        <StyledItemDiv>
                            <StyledLabel>이름</StyledLabel>
                            <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>타입</StyledLabel>
                            <StyledInput type="number" value={type} onChange={(e) => setType(parseInt(e.target.value))}/>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledInput type="file" onChange={(e) => {
                                    saveFileImage(e)
                                    if(e.target.files !== null) sendFileToIPFS(e.target.files[0])
                                }
                            }/>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            { imagePath ? <StyledImg src={imagePath} alt=""/> : <></>}
                        </StyledItemDiv>
                        <div>
                            {
                                isLoading? 
                                    <StyledLoadingGif/>:
                                    <StyledButtonDiv>
                                        <StyledBackButton onClick={() => router.back()}>목록으로</StyledBackButton>
                                        <StyledSubmitButton type="submit" onClick={(e) => onSubmit(e)}>등록</StyledSubmitButton>
                                    </StyledButtonDiv>
                            }
                        </div>
                    </StyledForm>
                </StyledMain>
            </div>
    )
}

export default NewItem

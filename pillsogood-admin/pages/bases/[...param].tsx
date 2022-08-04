import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react"
import SessionStorage from "../../utils/sessionStorage"
import { useRouter } from "next/router"
import axios from "axios"
import { PageTitle } from "../../components/PageTitle"
import React from "react";
import { StyledLoadingGif } from "../../components/StyledCommon"
import { StyledForm, StyledLabel, StyledInput, StyledItemDiv, StyledButtonDiv, StyledMain, StyledImg } from "../../components/StyledForm"
import { StyledSubmitButton, StyledBackButton } from '../../components/StyledCommon';

const GET_BASE = gql`
    query GetBase($jwt: String!, $id: String!) {
        getBase(jwt: $jwt, _id: $id) {
            _id
            name
            level
            imagePath
        }
    }
`
const UPDATE_BASE = gql`
    mutation UpdateBase($jwt: String!, $id: String, $name: String, $level: Int, $imagePath: String) {
        updateBase(jwt: $jwt, _id: $id, name: $name, level: $level, imagePath: $imagePath)
    }
`;

const DELETE_BASE = gql`
    mutation DeleteBase($jwt: String!, $id: String) {
        deleteBase(jwt: $jwt, _id: $id)
    }
`

export function getServerSideProps(context:any) {
    const baseId = context.query.param[0]
    return {
      props: {baseId: baseId}
    };
}

const BaseDetail = (props:any) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [imagePath, setImagePath] = useState('')
    const [id, setId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    var [updateBase, { data, loading, error }] = useMutation(UPDATE_BASE, {
        onCompleted: (data) => {
            if(data.updateBase === 200) {
                alert("수정되었습니다.")
                window.location.href = "/bases"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    var [deleteBase, { data, loading, error }] = useMutation(DELETE_BASE, {
        onCompleted: (data) => {
            if(data.deleteBase === 200) {
                alert("삭제되었습니다.")
                window.location.href = "/bases"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const onUpdateSubmit = (e: any) => {
        if(!confirm("수정하시겠습니까?")) return
        e.preventDefault();
        updateBase({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:id,
                name:name,
                imagePath:imagePath,
                level:level
            }
        })
    };

    const onDeleteSubmit = (e: any) => {
        if(!confirm("삭제하시겠습니까?")) return
        e.preventDefault();
        deleteBase({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:id
            }
        })
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

    const saveFileImage = (e:any) => {
        setImagePath(URL.createObjectURL(e.target.files[0]));
      };

    var { loading, data } = useQuery(
        GET_BASE,
        { variables: { jwt: SessionStorage.getItem("jwt"), id:props.baseId } }
    );

    useEffect(() => {
        if(data !== undefined){
            setName(data.getBase.name)
            setLevel(data.getBase.level)
            setImagePath(data.getBase.imagePath)
            setId(data.getBase._id)
        }
    }, [data])

    if (loading) {
        return (<StyledLoadingGif/>)
    } 
    if(data) {
        return (
            <div>
                <PageTitle title="기본 캐릭터 상세 정보"/>
                <StyledMain>
                    <StyledForm>
                        <StyledItemDiv>
                            <StyledLabel>이름</StyledLabel>
                            <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </StyledItemDiv>
                        <StyledItemDiv>
                            <StyledLabel>레벨</StyledLabel>
                            <StyledInput type="number" value={level} onChange={(e) => setLevel(parseInt(e.target.value))}/>
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
                                        <StyledSubmitButton type="submit" onClick={(e) => onUpdateSubmit(e)}>수정</StyledSubmitButton>
                                        <StyledBackButton type="button" onClick={(e) => onDeleteSubmit(e)}>삭제</StyledBackButton>
                                    </StyledButtonDiv>
                            }
                        </div>
                    </StyledForm>
                </StyledMain>
            </div>
        )
    }
    return (
        <StyledLoadingGif/>
    )
}

export default BaseDetail
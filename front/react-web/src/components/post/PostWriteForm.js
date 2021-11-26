import styled from "styled-components";
import {useState} from 'react'


function PostWriteForm(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])

    const onSubmit = (event)=>{
        event.preventDefault()
        console.log(title)
        console.log(content)
    }

    return(
        <StyledContainer>
            <StyledHead>Cogito, ergo sum</StyledHead>
            <StyledHr/>
            <StyledForm onSubmit={onSubmit}>
                <StyledTitleInput placeholder="제목을 입력해주세요" onChange={(event)=>{setTitle(event.target.value)}}/>
                <StyledContentTextArea placeholder="내용을 입력해주세요" onChange={(event)=>{setContent(event.target.value)}}/>
                <StyledThumbnailLabel>
                    Thumbnail Add
                    <StyledThumbnamilAddInput type="file" multiple="multiple" onChange={(event)=>{setImages(event.target.files)}}/>
                </StyledThumbnailLabel>
                <StyledButtonPosition>
                    <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
                </StyledButtonPosition>
            </StyledForm>
        </StyledContainer>
    )
}


const StyledContainer = styled.div`
`

const StyledHead = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledTitleInput = styled.input`
    display: flex;
    flex-direction: row;

    height: 2rem;
    width: 50rem;
    background-color: gainsboro;
    border: 0;
    margin-bottom: 1rem;
`

const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`


const StyledContentTextArea = styled.textarea`
    height: 5rem;
    background-color: gainsboro;
`

const StyledThumbnailLabel = styled.label`

`

const StyledThumbnamilAddInput = styled.input`
    display: none;

`

const StyledButtonPosition = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const StyledSubmitButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 10rem;
    height: 3rem;
    background-color: white;
    color: black;
    border-radius: 20px;

    margin-top: 1rem;
`

export default PostWriteForm
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postGetThunk } from '../../reducers/post/postGet'
import { postPatchThunk } from '../../reducers/post/postPatch'
import { postDeleteThunk } from '../../reducers/post/postDelete'


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`


const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`

function PostDetailQuill(props){
    const nickName =  localStorage.getItem("nickName")
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const {loading: postGetLoading, data: postGetData, error: postGetError} = useSelector(state=>state.postGetReducer) 

    const dispatch = useDispatch()

    useEffect(
        ()=>{
            dispatch(postGetThunk(props.postId))
        },[]
    )

    return(
        <StyledContainer>
            <div>Title: {postGetData?.title}</div>
            <div>Category: {postGetData?.category}</div>
            <div>Author: {postGetData?.author}</div>
            <div>
                <StyledHr/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postGetData?.content}}></div>
            <ul>
                {postGetData?.comments?.map((comment)=>{
                    return(
                        <li key={comment.id}>
                            <div>{comment.content}</div>
                        </li>
                    )
                })}
            </ul>
        </StyledContainer>
    )
}

export default PostDetailQuill
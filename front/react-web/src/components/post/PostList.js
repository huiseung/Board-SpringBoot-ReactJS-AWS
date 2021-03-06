import styled from 'styled-components'
import React, { useRef, useEffect } from 'react'
import {Link } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postListGetThunk } from '../../reducers/post/postlist'
import { Fragment } from 'react'

import PostRow from './PostRow'


const StyledContainer = styled.div`
    display: flex;
    justify-content: center; 
    flex-wrap: wrap;
    margin: 0px;
`

function PostList(){
    const postListState = useSelector(state=>state.postlistGetReducer)
    const {loading: postListLoading, data: postListData, error: postListError, page: page, size: size, isLast: isLast} = postListState
    const dispatch = useDispatch()
    const postListRef = useRef(null)
    postListRef.current = postListState

    useEffect(()=>{
        dispatch(postListGetThunk({page: 0, size: 5, init: true}))
        window.addEventListener("scroll", function(event){
            const {loading: postListLoading, data: postListData, error: postListError, page: page, size: size, isLast: isLast} = postListRef.current
            if(window.scrollY >= (document.body.scrollHeight-document.body.clientHeight)*0.85
            && postListLoading === false 
            && !isLast){
                postListRef.current.loading = true
                dispatch(postListGetThunk({page: page+1, size: size, init: false}))
            }
        })
    }, [])

    console.log("postListData",postListData)
    console.log("length", postListData?.length)
    return(
        <Fragment>
            {(postListData?.length === 0) ? 
                (
                    <Fragment>
                        <h2>Loading...</h2>
                    </Fragment>
                ):
                (
                    <StyledContainer>
                        {postListData?.map((data) => {
                            return <PostRow key={data.postId} postId = {data.postId} title={data.title} prevContent={data.prevContent} 
                                author={data.author} createAt={data.createAt}
                                category={data.category} thumbnail={data.thumbnailPath}></PostRow>
                        })}
                    </StyledContainer>
                )
            }
        </Fragment>
    )
}

export default React.memo(PostList)
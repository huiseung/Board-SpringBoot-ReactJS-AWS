import styled from 'styled-components'
import React, { useRef, useEffect } from 'react'
import {Link } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postListGetThunk } from '../../reducers/post/postlist'

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`
const StyledThead = styled.thead`
`
const StyledTh = styled.th`
    text-align: center;
`
const StyledTbody = styled.tbody`
`
const StyledTr = styled.tr`
`
const StyledTd = styled.td`
    text-align: center;
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
    
    
    return(
        <StyledTable>
            <StyledThead>
                <StyledTr>
                    <StyledTh style={{"width": "20px"}}>Category</StyledTh>
                    <StyledTh>Title</StyledTh>
                    <StyledTh style={{"width": "100px"}}>Author</StyledTh>
                    <StyledTh style={{"width": "200px"}}>CreateAt</StyledTh>
                </StyledTr>

            </StyledThead>
            <StyledTbody>
                {postListData?.map((data) => {
                    return(
                        <StyledTr key={data.postId}>
                            <StyledTd style={{"width": "20px"}}>{data.category}</StyledTd>
                            <StyledTd><Link to={'/posts/'+data.postId}>{data.title}</Link></StyledTd>
                            <StyledTd style={{"width": "100px"}}>{data.author}</StyledTd>
                            <StyledTd style={{"width": "200px"}}>{data.createAt}</StyledTd>
                        </StyledTr>                    
                    )
                })}
            </StyledTbody>
        </StyledTable>
    )
}

export default React.memo(PostList)
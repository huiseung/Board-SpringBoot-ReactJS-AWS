import styled from 'styled-components'
import { useState, useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postGetThunk } from '../../reducers/post/postGet'
import { postPatchThunk } from '../../reducers/post/postPatch'
import { postDeleteThunk } from '../../reducers/post/postDelete'
import { commentPost } from '../../utils/apis/comment'
import { PAGE_URL } from '../../utils/uris'


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`


function PostDetailQuill(props){
    const [content, setContent] = useState("")
    const history = useHistory()
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const {loading: postGetLoading, data: postGetData, error: postGetError} = useSelector(state=>state.postGetReducer) 

    const dispatch = useDispatch()

    useEffect(
        ()=>{
            dispatch(postGetThunk(props.postId))
        },[]
    )

    const commentSubmit = (event) => {
        event.preventDefault()
        if(loginData?.data === null){
            history.push(PAGE_URL.LOGIN)
        }
        commentPost({author: loginData?.nickName, postId: postGetData?.id, content: content})
    }

    return(
        <StyledContainer>
            <div>Title: {postGetData?.title}</div>
            <div>Category: {postGetData?.category}</div>
            <div>Author: {postGetData?.author}</div>
            <div>
                <StyledHr/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postGetData?.content}}></div>
            <div>
                <StyledHr/>
            </div>
            <div>
                <form onSubmit={commentSubmit} style={
                        {
                            "display": "flex",
                            "flexDirection": "column"
                        }
                    }>
                    <textarea onChange={(event)=>{setContent(event.target.value)}} placeholder="댓글을 작성해주세요"
                        style={{
                            "height": "50px"

                        }}>
                        </textarea>
                    <button type="submit" style={{
                        "width": "50px",
                        "marginTop": "1rem",
                        "marginLeft": "auto",
                        "marginRight": "1rem",
                        "borderRadius": "1rem"
                    }}>등록</button>
                </form>
            </div>
            <div>
                <StyledHr/>
            </div>
            
            <div>댓글 갯수: {postGetData?.comments?.length}</div>
            <ul>
                {postGetData?.comments?.map((comment)=>{
                    return(
                        <li key={comment.id}>
                            <div>작성자: {comment.content}</div>
                            <div>댓글: {comment.author}</div>
                        </li>
                    )
                })}
            </ul>

        </StyledContainer>
    )
}

export default PostDetailQuill
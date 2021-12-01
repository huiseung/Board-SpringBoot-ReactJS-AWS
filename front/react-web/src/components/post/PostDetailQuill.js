import styled from 'styled-components'
import { useState, useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postGetThunk } from '../../reducers/post/postGet'
import { postPatchThunk } from '../../reducers/post/postPatch'
import { postDeleteThunk } from '../../reducers/post/postDelete'
import { commentPostThunk, commentCreateResetThunk } from '../../reducers/comment/commentPost'
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
    const [commentContent, setCommentContent] = useState("")
    const history = useHistory()
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const {loading: postGetLoading, data: postGetData, error: postGetError} = useSelector(state=>state.postGetReducer) 
    const {loading: commentPostLoading, data: commentPostData, error: commentPostError} = useSelector(state=>state.commentPostReducer) 


    const dispatch = useDispatch()

    useEffect(
        ()=>{
            dispatch(postGetThunk(props.postId))
            if(commentPostData !== null){
                setCommentContent("")
                dispatch(commentCreateResetThunk())
            }
        }, [commentPostData]
    )

    const commentSubmit = (event) => {
        event.preventDefault()
        console.log("login?", loginData?.data)
        if(loginData === null){
            alert("Login후 댓글을 입력 해주세요")
        }
        else{
            //console.log("start comment post", {"author": loginData?.nickName, "postId": postGetData?.id, "content": content})
            dispatch(commentPostThunk({author: loginData?.nickName, postId: postGetData?.id, content: commentContent}))
        }
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
                    <textarea value={commentContent} onChange={(event)=>{setCommentContent(event.target.value)}} placeholder="댓글을 작성해주세요"
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
                            <div>댓글: {comment.content}</div>
                            <div>작성자: {comment.author}</div>
                        </li>
                    )
                })}
            </ul>
        </StyledContainer>
    )
}

export default PostDetailQuill
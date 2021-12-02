import styled from 'styled-components'
import { useState, useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postGetThunk } from '../../reducers/post/postGet'
import { postPatchThunk } from '../../reducers/post/postPatch'
import { postDeleteThunk } from '../../reducers/post/postDelete'
import { commentPostThunk, commentCreateResetThunk } from '../../reducers/comment/commentPost'
import { PAGE_URL } from '../../utils/uris'
import { Fragment } from 'react'
import { commentDeleteThunk } from '../../reducers/comment/commentDelelte'


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 160px 0 160px;
`

const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`


function PostDetailQuill(props){
    const [commentContent, setCommentContent] = useState("")
    const [isWriteComment, setIsWriteComment] = useState(false)
    const history = useHistory()
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const {loading: postGetLoading, data: postGetData, error: postGetError} = useSelector(state=>state.postGetReducer) 
    const {loading: commentPostLoading, data: commentPostData, error: commentPostError} = useSelector(state=>state.commentPostReducer) 
    const {loading: commentDeleteLoading, data: commentDeleteData, error: commentDeleteError} = useSelector(state=>state.commentDeleteReducer) 


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
    useEffect(
        ()=>{
            console.log("commentDeleteData",commentDeleteData)
            dispatch(postGetThunk(props.postId))
        }, [commentDeleteData]
    )

    const commentSubmit = (event) => {
        event.preventDefault()
        dispatch(commentPostThunk({postId: postGetData?.id, content: commentContent}))
    }

    return(
        <StyledContainer styled={{
            "backgroundColor": "white",
        }}>
            <div style={{
                "display": "flex",
                "flexDirection": "column",
                "justifyItems": "center",
            }}>
                <div style={{
                    "display": "flex",
                    "flexDirection":"column",
                    "justifyItems":"center",
                    "alignItems":"center"
                }}>
                    <h1>{postGetData?.title}</h1>
                </div>
                <div>
                    {
                        (postGetData?.edit)?
                        (<div style={{
                            "display":"flex",
                            "justifyContent":"flex-end"
                        }}>
                            <button onClick={()=>{
                                dispatch(postDeleteThunk(postGetData?.id)).then(
                                    history.push(PAGE_URL.HOME)
                                )
                            }}
                            style={{
                                "marginBottom": "1rem",
                                "outline": "none",
                                "border": "none",
                                "height": "2rem",
                                "padding":"0px",
                                "cursor": "pointer",
                                "width": "4rem"    
                            }}>삭제</button>
                        </div>):
                        (<Fragment>

                        </Fragment>)
                    }
                </div>
                <div style={{
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "flex-start",
                }}>
                    <span>{postGetData?.author}</span>
                    <span style={{
                        "marginLeft":"0.5rem",
                        "marginRight":"0.5rem"
                    }}>·</span>
                    <span>{postGetData?.category}</span>

                </div>
            </div>
            <div  style={{
                    "marginBottom": "1rem"
                }}>
                <StyledHr/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postGetData?.content}}></div>
            <div>
                <StyledHr/>
            </div>
            <div>
                <button onClick={()=>{
                    if(loginData === null){
                        alert("Login후 댓글을 입력 해주세요")
                    }
                    else{
                        setIsWriteComment(!isWriteComment)}
                    }      
                } style={
                    {
                        "marginBottom": "1rem",
                        "outline": "none",
                        "border": "none",
                        "borderRadius": "4px",
                        "backgroundColor": "#12b886",
                        "fontWeight": "bold",
                        "fontFamily": "inherit",
                        "color": "white",
                        "height": "2rem",
                        "width": "4rem",
                    }
                }>댓글 달기</button>
                {
                    (isWriteComment)?(
                        <Fragment>
                            <form onSubmit={commentSubmit} style={
                                {
                                    "display": "flex",
                                    "flexDirection": "column"
                                }
                            }>
                                <textarea value={commentContent} onChange={(event)=>{setCommentContent(event.target.value)}} placeholder="댓글을 작성해주세요"
                                    style={{
                                        "height": "50px",
                                        "border": "1px solid #e9ecef",
                                    }}>
                                </textarea>
                                <button type="submit" style={{
                                    
                                    "marginTop": "1rem",
                                    "marginLeft": "auto",
                                    "marginRight": "1rem",
                                    "outline": "none",
                                    "border": "none",
                                    "borderRadius": "4px",
                                    "backgroundColor": "#12b886",
                                    "fontWeight": "bold",
                                    "fontFamily": "inherit",
                                    "color": "white",
                                    "height": "2rem",
                                    "width": "4rem",
                                }}>등록</button>
                            </form>
                        </Fragment>
                    ):(
                        <Fragment>
                        </Fragment>
                    )
                }
            </div>
            <div>
                <StyledHr/>
            </div>
            
            <div>댓글 갯수: {postGetData?.comments?.length}</div>
            <ul>
                {postGetData?.comments?.map((comment)=>{
                    return(
                        <div key={comment.id}>
                            <div style={{
                                "display":"flex",
                                "justifyContent":"space-between",
                                "alignItems":"center",
                                "marginBottom":"1rem"
                            }}>
                                <div>
                                    <span>작성자: {comment.author}</span>
                                    <span style={{
                                        "marginLeft":"0.5rem",
                                        "marginRight":"0.5rem"
                                    }}>·</span>
                                    <span>{comment.createAt}</span>
                                </div>
                                <div>
                                    {comment.edit?
                                        (<div style={{
                                            "display": "flex",
                                            "flexDirection":"column",
                                            "justifyContent":"center",
                                            "alignItems":"center"
                                        }}>
                                            <button onClick={
                                                ()=>{
                                                    console.log("comment", comment.id)
                                                    dispatch(commentDeleteThunk(comment.id))
                                                }
                                            } style={{
                                                "marginBottom": "1rem",
                                                "outline": "none",
                                                "border": "none",
                                                "height": "2rem",
                                                "padding":"0px",
                                                "cursor": "pointer",
                                                "width": "4rem" 
                                            }}>삭제</button>
                                        </div>)
                                        :
                                        (<Fragment>
                                        
                                        </Fragment>)
                                    }
                                </div>
                            </div>
                            <div>댓글: {comment.content}</div>
                            <div>
                                <StyledHr/>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </StyledContainer>
    )
}

export default PostDetailQuill
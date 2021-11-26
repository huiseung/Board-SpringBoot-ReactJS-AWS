import { useState, useEffect } from 'react'
import { Link, withRouter , useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postGetThunk } from '../../reducers/post/postGet'
import { postPatchThunk } from '../../reducers/post/postPatch'
import { postDeleteThunk } from '../../reducers/post/postDelete'


function PostDetail(props){
    const history = useHistory()
    const nickName = localStorage.getItem("nickName")
    
    const [updateTitle, setUpdateTitle] = useState("")
    const [updateContent, setUpdateContent] = useState("")
    const [updateCategory, setUpdateCategory] = useState("")
    const [isPostUpdate, setIsPostUpdate] = useState(false)

    const {loading: postGetLoading, data: postGetData, error: postGetError} = useSelector(state=>state.postGetReducer) 
    const {loading: postPatchLoading, data: postPatchData, error: postPatchError} = useSelector(state=>state.postPatchReducer) 
    const {loading: postDeleteLoading, data: postDeleteData, error: postDeleteError} = useSelector(state=>state.postDeleteReducer) 

    const dispatch = useDispatch()
    useEffect(
        ()=>{
            dispatch(postGetThunk(props.postId))
        },[]
    )

    const updateSubmit = (event) => {
        event.preventDefault()
        dispatch(postPatchThunk({postId: props.postId, title: updateTitle, content: updateContent, category: updateCategory}))
    }

    const deleteClick = ()=>{
        dispatch(postDeleteThunk(props.postId))
    }

    useEffect(()=>{
        console.log("patch data ", postPatchData, "loading ", postPatchLoading, "postId ", props.postId)
        if(postPatchLoading === false && postPatchData?.postId == props.postId){
            console.log("yes?")
            setIsPostUpdate(false)
            dispatch(postGetThunk(props.postId))
        }
    }, [postPatchData, postPatchLoading])

    useEffect(()=>{
        console.log("data ", postDeleteData, "loading ", postDeleteLoading, "postId ", props.postId)
        if(postDeleteLoading === false && postDeleteData?.postId == props.postId){
            history.push("/posts")
        }
    }, [postDeleteData, postDeleteLoading])

    return(
        <div>
            {!isPostUpdate &&       
            (
            <div>
                <ul>
                        <li>
                            <div>Title</div>
                            <div>{postGetData?.title}</div>
                        </li>
                        <li>
                            <div>Content</div>
                            <div>{postGetData?.content}</div>
                        </li>
                        <li>
                            <div>Category</div>
                            <div>{postGetData?.category}</div>
                        </li>
                        <li>
                            <div>Author</div>
                            <div>{postGetData?.author}</div>
                        </li>
                        <div>
                        {postGetData?.imageFileNames?.map((fileName)=>{
                                        return(
                                            <img src={`http://localhost:8080/api/images?fileName=${fileName}`}/>
                                        )
                                    })}
                        </div>
                </ul>
                {postGetData?.author === nickName ? 
                (
                    <div>
                        <button onClick={()=>{setIsPostUpdate(true)}}>수정</button> 
                        <button onClick={deleteClick}>삭제</button>  
                    </div>
                ): <div>수정/삭제 불가</div>}
            </div>
            )
            }

            {isPostUpdate&&(
                <div>
                    <form onSubmit={updateSubmit}>
                        <div>
                            <input placeholder="title" onChange={(event)=>{setUpdateTitle(event.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="content" onChange={(event)=>{setUpdateContent(event.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="category" onChange={(event)=>{setUpdateCategory(event.target.value)}}></input>
                        </div>
                        <button type="submit">수정</button>
                    </form>
                    <button onClick={()=>setIsPostUpdate(false)}>수정 취소</button>
                </div>
                )
            }
        </div>
    )
}

export default PostDetail
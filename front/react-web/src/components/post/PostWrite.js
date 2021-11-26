import { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { postPostThunk } from '../../reducers/post/postPost'

export default function PostWrite(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const author = "testNickName"
    const category = "MOVIE"
    const history = useHistory()
    const {loading: postPostLoading, data: postPostData, error: postPostError} = useSelector(state=>state.postPostReducer)

    const dispatch = useDispatch()

    const onSubmit = (event)=>{
        event.preventDefault()
        const formData = new FormData()
        let textForm = {
            title: title,
            content: content,
            author: author,
            category: category,

        }
        formData.append("data", new Blob([JSON.stringify(textForm)], {type:"application/json"}))     
        for(let i=0; i < images.length;i++){
            formData.append("images", images[i], images[i].name)
        }
        console.log(formData.getAll("images"))
        dispatch(postPostThunk(formData))
        //dispatch(postPostThunk({title: title, content: content, author: author, category: category}))
    }

    // useEffect(()=>{
    //     if(postPostLoading === false && postPostData !== null){
    //         history.push("/posts/"+postPostData?.postId)
    //     }
    // }, [postPostData, postPostLoading])

    return(
        <div>
            <form onSubmit={onSubmit}>
                <ul>
                    <li>
                        <input placeholder="title" onChange={(event)=>{setTitle(event.target.value)}}></input>
                    </li>
                    <li>
                        <textarea onChange={(event)=>{setContent(event.target.value)}}></textarea>
                    </li>
                    <li>
                        <input type="file" multiple="multiple" onChange={(event)=>{setImages(event.target.files)}}></input>
                    </li>
                </ul>
                <button type="submit">글 등록</button>
            </form>
        </div>
    )
}
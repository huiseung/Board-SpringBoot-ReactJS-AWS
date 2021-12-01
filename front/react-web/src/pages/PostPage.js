import PostDetailQuill from '../components/post/PostDetailQuill'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function PostPage({match}){
    const { postId } = match.params

    return(
        <PostDetailQuill postId={postId}></PostDetailQuill>
    )
}
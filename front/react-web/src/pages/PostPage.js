import PostDetailQuill from '../components/post/PostDetailQuill'

export default function PostPage({match}){
    const { postId } = match.params
    return(
        <PostDetailQuill postId={postId}></PostDetailQuill>
    )
}
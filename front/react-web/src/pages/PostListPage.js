import PostList from '../components/post/PostList'

export default function PostListPage(){
    return(
        <div>
            {/* {!isWrite && (<button onClick={()=>{setIsWrite(!isWrite)}}>글 쓰기</button>)}
            {isWrite && (
                <div>
                    <PostWrite></PostWrite>
                    <button onClick={()=>{setIsWrite(!isWrite)}}>글 쓰기 취소</button>
                </div>
            )} */}
            <PostList></PostList>
        </div>
    )
}
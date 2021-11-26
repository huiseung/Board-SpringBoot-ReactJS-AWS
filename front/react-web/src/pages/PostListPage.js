import {useState} from 'react'
import PostList from '../components/post/PostList'
import PostWrite from '../components/post/PostWrite'

export default function PostListPage(){
    const [isWrite, setIsWrite]= useState(false)
    console.log("isWrite ",isWrite)
    return(
        <div>
            {!isWrite && (<button onClick={()=>{setIsWrite(!isWrite)}}>글 쓰기</button>)}
            {isWrite && (
                <div>
                    <PostWrite></PostWrite>
                    <button onClick={()=>{setIsWrite(!isWrite)}}>글 쓰기 취소</button>
                </div>
            )}
            <PostList></PostList>
        </div>
    )
}
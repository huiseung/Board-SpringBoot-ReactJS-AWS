import apiCall from "./apicall";

let RESOURCE = '/comments'

export function commentPost({author, postId, content}){
    const callParam = {
        method: "POST",
        url: RESOURCE,
        requestBody: {
            postId: postId,
            author: author,
            content: content,
        }
    }
    return apiCall(callParam)
}
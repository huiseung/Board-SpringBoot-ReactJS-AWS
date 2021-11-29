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
    //console.log("POST comment", callParam)
    return apiCall(callParam)
}
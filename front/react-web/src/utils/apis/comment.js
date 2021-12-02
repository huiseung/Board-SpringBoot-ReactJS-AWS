import apiCall from "./apicall";

let RESOURCE = '/comments'

export function commentPost({postId, content}){
    const callParam = {
        method: "POST",
        url: RESOURCE,
        requestBody: {
            postId: postId,
            content: content,
        }
    }
    //console.log("POST comment", callParam)
    return apiCall(callParam)
}
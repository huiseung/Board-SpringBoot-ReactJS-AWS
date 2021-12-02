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

export function commentDelete(commentId){
    const callParam = {
        method: "DELETE",
        url: RESOURCE + "/"+commentId,
    }
    console.log("comment delete call param", callParam)
    return apiCall(callParam)
}
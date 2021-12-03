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
    return apiCall(callParam)
}

export function commentPatch({commentId, content}){
    const callParam = {
        method: "PATCH",
        url: RESOURCE+"/"+commentId,
        requestBody: {
            commentId: commentId,
            content: content
        }
    }
    console.log("comment patch", callParam)
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
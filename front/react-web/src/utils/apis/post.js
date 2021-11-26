import apiCall from "./apicall";

let RESOURCE = '/posts'


export function postPost(formData){
    const callParam = {
        method: "POST",
        url: RESOURCE,
        requestBody: formData
    }
    console.log("call postPost")
    return apiCall(callParam)
}

// export function postPost(formData){
//     const callParam = {
//         method: "POST",
//         url: RESOURCE,
//         requestBody: formData,
//         headers: {
//             "Content-Type": "multipart/form-data",
//         }
//     }
//     console.log("call postPost")
//     return apiCall(callParam)
// }

// export function postPost({title, content, author, category}){
//     const requestBody = {
//         title: title,
//         content: content,
//         author: author,
//         category: category
//     }
//     const callParam = {
//         method: "POST",
//         url: RESOURCE,
//         requestBody: requestBody
//     }
//     return apiCall(callParam)
// }

export function postListGet({page, size}){
    const queryparamter = {
        page: page,
        size: size
    }

    const callParam = {
        method: "GET",
        url: RESOURCE,
        queryparamter: queryparamter
    }
    return apiCall(callParam)
}

export function postGet(postId){
    const callParam = {
        method: "GET",
        url: RESOURCE + '/' + postId
    }
    console.log("postGet CallParam ", callParam, "id", postId)
    return apiCall(callParam)
}

export function postPatch({postId, title, content, category}){
    const requestBody = {
        title: title,
        content: content,
        category: category
    }
    const callParam = {
        method: "PATCH",
        url: RESOURCE+'/'+ postId,
        requestBody: requestBody
    }
    return apiCall(callParam)
}

export function postDelete(postId){
    const callParam = {
        method: "DELETE",
        url: RESOURCE +"/"+ postId,
    }
    return apiCall(callParam)
}
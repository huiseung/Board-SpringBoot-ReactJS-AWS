import apiCall from "./apicall"

export function loginCall({identifier, password}){
    const callParam = {
        method: "POST",
        url: "/tokens",
        requestBody: {
            identifier: identifier,
            password: password
        },
    }
    return apiCall(callParam)
}


export function logoutCall(){
    const callParam = {
        method: "DELETE",
        url: "/tokens",
    }
    return apiCall(callParam)
}


export function signUpCall({identifier, password}){
    const callParam = {
        method: "POST",
        url: "/users",
        requestBody: {
            identifier: identifier,
            password: password
        }
    }
    return apiCall(callParam)
}


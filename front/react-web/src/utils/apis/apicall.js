import axios from 'axios'
import { API_BASE_URL } from '../uris'


export default function apiCall({method, url, queryparamter, requestBody, headers, withCredentials=true}){
    let options = {
        method: method,
        url: API_BASE_URL+url,
        withCredentials: withCredentials,
    }

    if(headers !== undefined){
        options.headers = headers
    }
    
    if(queryparamter !== undefined){
        options.params = queryparamter
    }

    if(requestBody !== undefined){
        options.data = requestBody
    }

    console.log("call options ",options)

    return axios(options).then((response)=>{
        return response.data
    }).catch((e, response)=>{
        console.log("error", e)
        console.log(response)
        const error = {
            success: false,
            response: null,
            error: {
                status: 500,
                message: "server error"
            }
        }
        return error
    })
}
import {postPost} from '../../utils/apis/post'
import createAction from '../../utils/reducers/createAction'

const [POST_POST, POST_POST_SUCCESS, POST_POST_FAIL] = createAction("POST_POST")

export function postPostThunk(formData){
    return async function(dispatch, useState){
        const action = {
            type: POST_POST
        }
        dispatch(action)
        postPost(formData).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: POST_POST_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: POST_POST_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "post를 작성하는데 실패했습니다."
                        }
                    }
                    dispatch(action)
                }
            }
        )
    }
}


// export function postPostThunk({title, content, author, category}){
//     return async function(dispatch, useState){
//         const action = {
//             type: POST_POST
//         }
//         dispatch(action)
//         postPost({title: title, content: content, author: author, category:category}).then(
//             (result)=>{
//                 if(result.success !== null){
//                     const action = {
//                         type: POST_POST_SUCCESS,
//                         payload:{
//                             data: result.response
//                         }
//                     }
//                     dispatch(action)
//                 }
//                 else{
//                     const action = {
//                         type: POST_POST_FAIL,
//                         payload:{
//                             status: result.error.status,
//                             message: "post를 작성하는데 실패했습니다."
//                         }
//                     }
//                     dispatch(action)
//                 }
//             }
//         )
//     }
// }

const initState = {
    loading: false,
    data: null,
    error: null
}

export default function postPostReducer(state=initState, action){
    switch(action.type){
        case POST_POST:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }
        
        case POST_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case POST_POST_FAIL:
            return{
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state
    }
}
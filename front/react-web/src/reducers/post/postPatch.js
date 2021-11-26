import { postPatch } from "../../utils/apis/post";
import createAction from "../../utils/reducers/createAction";

const [POST_PATCH, POST_PATCH_SUCCESS, POST_PATCH_FAIL] = createAction("POST_PATCH")

export function postPatchThunk({postId, title, content, category}){
    return async function(dispatch, useState){
        const action = {
            type: POST_PATCH
        }
        dispatch(action)
        postPatch({postId:postId, title:title, content:content, category:category}).then(
            (result)=>{
                console.log("postPatch", result)
                if(result.success === true){
                    const action = {
                        type: POST_PATCH_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: POST_PATCH_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "post 수정에 실패했습니다"
                        }
                    }
                    dispatch(action)
                }
            }
        )
    }
}

const initState = {
    loading: false,
    data: null,
    error: null
}


export default function postPatchReducer(state=initState, action){
    switch(action.type){
        case POST_PATCH:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case POST_PATCH_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case POST_PATCH_FAIL:
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
import { postDelete } from "../../utils/apis/post";
import createAction from "../../utils/reducers/createAction";

const [POST_DELETE, POST_DELETE_SUCCESS, POST_DELETE_FAIL] = createAction("POST_DELETE")

export function postDeleteThunk(postId){
    return async function(dispatch, useState){
        const action = {
            type: POST_DELETE
        }
        dispatch(action)
        postDelete(postId).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: POST_DELETE_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: POST_DELETE_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "post 삭제에 실패했습니다"
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


export default function postDeleteReducer(state=initState, action){
    switch(action.type){
        case POST_DELETE:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case POST_DELETE_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case POST_DELETE_FAIL:
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
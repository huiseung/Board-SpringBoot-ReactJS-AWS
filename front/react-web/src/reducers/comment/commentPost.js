import { commentPost } from "../../utils/apis/comment";
import createAction from "../../utils/reducers/createAction";


const [COMMENT_POST, COMMENT_POST_SUCCESS, COMMENT_POST_FAIL] = createAction("COMMENT_POST")
const COMMENT_CREATE_RESET = "COMMENT_CREATE_RESET"


export function commentCreateResetThunk(){
    return async function(dispatch){
        const action = {
            type: COMMENT_CREATE_RESET
        }
        dispatch(action)
    }
}

export function commentPostThunk({ postId, content}){
    return async function(dispatch, useState){
        const action = {
            type: COMMENT_POST
        }
        dispatch(action)
        //console.log("Post comment thunk...")
        commentPost({postId, content}).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: COMMENT_POST_SUCCESS,
                        payload: {
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: COMMENT_POST_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "댓글 작성하는데 실패했습니다."
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

export default function commentPostReducer(state=initState, action){
    switch(action.type){
        case COMMENT_POST:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }
        
        case COMMENT_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case COMMENT_POST_FAIL:
            return{
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }

        case COMMENT_CREATE_RESET:
            return{
                loading: false,
                data: null,
                error: null
            }
        default:
            return state
    }
}
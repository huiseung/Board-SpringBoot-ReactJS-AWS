import { commentPatch } from "../../utils/apis/comment";
import createAction from "../../utils/reducers/createAction";

const [COMMENT_PATCH, COMMENT_PATCH_SUCCESS, COMMENT_PATCH_FAIL] = createAction("COMMENT_PATCH")

export function commentPatchThunk({commentId, content}){
    return async function(dispatch, useState){
        const action = {
            type: COMMENT_PATCH
        }
        dispatch(action)
        commentPatch({commentId:commentId, content:content}).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: COMMENT_PATCH_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: COMMENT_PATCH_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "comment 수정에 실패했습니다"
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


export default function commentPatchReducer(state=initState, action){
    switch(action.type){
        case COMMENT_PATCH:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case COMMENT_PATCH_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case COMMENT_PATCH_FAIL:
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
import { commentDelete } from "../../utils/apis/comment";
import createAction from "../../utils/reducers/createAction";

const [COMMENT_DELETE, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAIL] = createAction("COMMENT_DELETE")

export function commentDeleteThunk(commentId){
    return async function(dispatch, useState){
        const action = {
            type: COMMENT_DELETE
        }
        dispatch(action)
        commentDelete(commentId).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: COMMENT_DELETE_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: COMMENT_DELETE_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "comment 삭제에 실패했습니다"
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


export default function commentDeleteReducer(state=initState, action){
    switch(action.type){
        case COMMENT_DELETE:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case COMMENT_DELETE_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case COMMENT_DELETE_FAIL:
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
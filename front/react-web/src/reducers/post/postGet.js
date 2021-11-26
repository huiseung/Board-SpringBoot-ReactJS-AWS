import {postGet} from '../../utils/apis/post'
import createAction from '../../utils/reducers/createAction'

const [POST_GET, POST_GET_SUCCESS, POST_GET_FAIL] = createAction("POST_GET")


export function postGetThunk(postId){
    return async function(dispatch, useState){
        const action = {
            type: POST_GET
        }
        dispatch(action)
        postGet(postId).then(
            (result)=>{
                console.log("postGet ", result)
                if(result.success === true){
                    const action = {
                        type: POST_GET_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: POST_GET_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "post를 가져오는데 실패했습니다."
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

export default function postGetReducer(state=initState, action){
    switch(action.type){
        case POST_GET:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }
        
        case POST_GET_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case POST_GET_FAIL:
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
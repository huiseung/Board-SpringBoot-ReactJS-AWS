import {postListGet} from '../../utils/apis/post'
import createAction from '../../utils/reducers/createAction'

const [POSTLIST_GET, POSTLIST_GET_SUCCESS, POSTLIST_GET_FAIL] = createAction("POSTLIST_GET")


export function postListGetThunk({page, size, init=true}){
    return async function(dispatch, useState){
        const action = {
            type: POSTLIST_GET,
            payload: {
                page: page,
                size: size,
                init: init
            }
        }
        dispatch(action)
        postListGet({page: page, size: size}).then(
            (result)=>{
                console.log("postlist get")
                console.log(result.success)
                console.log(result.response)
                console.log(result.error)
                console.log("===========")

                if(result.success === true){
                    let postlist = []
                    if(result.response.postListRowResponseDtoList !== null){
                        postlist = result.response.postListRowResponseDtoList
                    }
                    const action = {
                        type: POSTLIST_GET_SUCCESS,
                        payload: {
                            postlist: postlist,
                            isLast: result.response.isLast
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: POSTLIST_GET_FAIL,
                        payload: {
                            status: result.error.status,
                            message: "postlist 가져오기 실패"
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
    data: [],
    error: null,
    page: 0,
    size: 5,
    isLast: false
}


export default function postlistGetReducer(state=initState, action){
    switch(action.type){
        case POSTLIST_GET:
            return{
                ...state,
                ...(action.payload.init?{data:[]}:{}),
                loading: true,
                error: null,
                page: action.payload.page,
                size: action.payload.size
            }
        case POSTLIST_GET_SUCCESS:
            return{
                ...state,
                loading: false,
                data: [...state.data,...action.payload.postlist],
                isLast: action.payload.isLast,
                error: null
            }
        case POSTLIST_GET_FAIL:
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


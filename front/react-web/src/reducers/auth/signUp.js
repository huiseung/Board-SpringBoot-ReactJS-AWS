import { signUpCall } from "../../utils/apis/auth"
import createAction from "../../utils/reducers/createAction"
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL] = createAction("SIGNUP")


export function signUpThunk({identifier, password}){
    return async function(dispatch, useState){
        dispatch({type: SIGNUP})
        signUpCall({identifier, password}).then(
            (result)=>{
                if(result.success === true){
                    const action = {
                        type: SIGNUP_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: SIGNUP_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "SignUp 실패했습니다"
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


export default function signUpReducer(state=initState, action){
    switch(action.type){
        case SIGNUP:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case SIGNUP_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case SIGNUP_FAIL:
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


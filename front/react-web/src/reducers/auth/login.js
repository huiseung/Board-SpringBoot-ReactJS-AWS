import { loginCall, logoutCall } from "../../utils/apis/auth"
import createAction from "../../utils/reducers/createAction"
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL] = createAction("LOGIN")
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL] = createAction("LOGOUT")

export function loginThunk({identifier, password}){
    return async function(dispatch, useState){
        dispatch({type: LOGIN})
        loginCall({identifier, password}).then(
            (result)=>{
                console.log("login result", result)
                console.log("login result.success", result.success)
                console.log("login result.error", result.error)
                if(result.success === true){
                    const action = {
                        type: LOGIN_SUCCESS,
                        payload:{
                            data: result.response
                        }
                    }
                    dispatch(action)
                }
                else if(result.success === false){
                    const action = {
                        type: LOGIN_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "LOGIN 실패했습니다"
                        }
                    }
                    dispatch(action)
                }
            }
        )
    }
}


export function logoutThunk(){
    return async function(dispatch){
        dispatch({type: LOGOUT})
        logoutCall().then(
            (result)=>{
                console.log("logout result", result)
                console.log("logout result.success", result.success)
                console.log("logout result.error", result.error)
                if(result.success === true){
                    dispatch({type: LOGOUT_SUCCESS})
                }
                else if(result.success === false){
                    const action = {
                        type: LOGOUT_FAIL,
                        payload:{
                            status: result.error.status,
                            message: "LOGOUT 실패했습니다"
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


export default function loginReducer(state=initState, action){
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload.data,
                error: null
            }
        case LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                loading: true,
                data: null,
                error: null
            }        
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loading: false,
                data: null,
                error: null
            }
        case LOGOUT_FAIL:
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


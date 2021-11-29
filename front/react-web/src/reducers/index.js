import { combineReducers } from "redux";
import postlistGetReducer from './post/postlist'
import postPostReducer from "./post/postPost";
import postGetReducer from './post/postGet'
import postPatchReducer from './post/postPatch'
import postDeleteReducer from './post/postDelete'
import loginReducer from "./auth/login";
import signUpReducer from "./auth/signUp";
import commentPostReducer from "./comment/commentPost";

const rootReducer = combineReducers({
    postlistGetReducer,
    postPostReducer,
    postGetReducer,
    postPatchReducer,
    postDeleteReducer,
    loginReducer,
    signUpReducer,
    commentPostReducer,
})

export default rootReducer
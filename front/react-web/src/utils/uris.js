export const API_BASE_URL = process.env.NODE_ENV==="production"? process.env.REACT_APP_BACKEND:"http://localhost:8080/api"

export const PAGE_URL = {
    HOME: "/",
    SIGNUP: "/signup",
    LOGIN: "/login",
    POST: "/posts/:postId",
    POSTLIST: "/posts",
    POSTWITE: "/write"
}


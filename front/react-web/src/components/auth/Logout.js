import styled from "styled-components"
import { useEffect } from "react"
import { withRouter } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutThunk } from "../../reducers/auth/login"
import { PAGE_URL } from "../../utils/uris"


const StyledButton = styled.button`
    background-color: white;
    color: black;
    border-radius: 20px;
    margin-left: 1rem;

`

function Logout({history}){    
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(logoutThunk())
    }
    
    useEffect(
        ()=>{
            if(loginLoading === false && loginData === null && loginError === null){
                history.push(PAGE_URL.HOME)
            }
        }, [history, loginData]
    )

    return(
        <StyledButton onClick={onClick}>Logout</StyledButton>
    )
}

export default withRouter(Logout)
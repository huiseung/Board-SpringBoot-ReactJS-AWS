import styled from "styled-components"
import { useEffect } from "react"
import { useHistory, withRouter } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutThunk } from "../../reducers/auth/login"
import { PAGE_URL } from "../../utils/uris"


const StyledButton = styled.button`
    width: 80px;
    height: 35px;
    background-color: #343a40;
    color: white;
    border-radius: 20px;
    border: none;
    outline: none;
    margin-left: 1rem;

    font-size: 1rem;
    font-weight: bold;
    font-family: inherit;

`

function Logout(){    
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const onClick = () => {
        dispatch(logoutThunk())
    }
    
    useEffect(
        ()=>{
            if(loginLoading === false && loginData === null && loginError === null){
                history.push(PAGE_URL.HOME)
            }
        }, [history, loginLoading, loginData, loginError]
    )

    return(
        <StyledButton onClick={onClick}>Logout</StyledButton>
    )
}

export default Logout
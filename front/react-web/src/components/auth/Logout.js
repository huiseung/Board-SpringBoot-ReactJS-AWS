import styled from "styled-components"
import { useEffect } from "react"
import { useHistory, withRouter } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutThunk } from "../../reducers/auth/login"
import { PAGE_URL } from "../../utils/uris"


const StyledButton = styled.button`
    width: 55px;
    height: 35px;
    background-color: white;
    color: black;
    border-radius: 20px;
    margin-left: 1rem;

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
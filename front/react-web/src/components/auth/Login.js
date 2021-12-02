import styled from "styled-components"
import {useState} from 'react'
import { Link, withRouter} from 'react-router-dom'
import { PAGE_URL } from "../../utils/uris"
import { useSelector, useDispatch } from "react-redux"
import { loginThunk } from "../../reducers/auth/login"
import { useEffect } from "react"


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /*주축*/
    align-items: center;

    margin-top: 8rem;
`

const StyledTitle = styled.h1`
`

const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledInput = styled.input`
    width: 465px;
    height: 50px;

    border: solid 1px; 
    font-size: 14px;
`

const StyledButton = styled.button`
    width: 465px;
    height: 50px;

    margin-top: 10px;
    margin-bottom: 10px;
    
    border: solid 1px;
    font-size: 18px;
    color: black;
    background-color: blanchedalmond;
`

function Login({history}){
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(loginThunk({identifier, password}))
    }
    
    useEffect(()=>{
        if(loginData != null){
            history.goBack()
        }
    }, [history, loginData])

    return(
        <StyledContainer>
            <StyledTitle>Login</StyledTitle>
            <StyledLoginForm onSubmit={onSubmit}>
                <StyledInput placeholder="Identifier" onChange={(event)=>{setIdentifier(event.target.value)}}></StyledInput>
                <StyledInput placeholder="Password" type="password" onChange={(event)=>{setPassword(event.target.value)}}></StyledInput>
                {({loginError} !== null) ? <div>{loginError?.message}</div>:<div></div>}
                <StyledButton type="submit">Login</StyledButton>
                <StyledButton><Link to={PAGE_URL.SIGNUP}>SignUp</Link></StyledButton>
            </StyledLoginForm>
        </StyledContainer>
    )
}

export default withRouter(Login)
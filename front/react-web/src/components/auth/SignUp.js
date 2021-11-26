import styled from "styled-components"
import {useState} from 'react'
import { Link, withRouter} from 'react-router-dom'
import { PAGE_URL } from "../../utils/uris"
import { useSelector, useDispatch } from "react-redux"
import { signUpThunk } from "../../reducers/auth/signUp"
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

function SignUp(props){
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const {loading: signUpLoading, data: signUpData, error: signUpError} = useSelector(state=>state.signUpReducer)
    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(signUpThunk({identifier, password}))
        if(signUpData != null){
            setIsSignUp(true)
        }
    }
    
    useEffect(()=>{
        if(isSignUp){
            props.history.push(PAGE_URL.LOGIN)
        }
    }, [props.history, isSignUp])

    return(
        <StyledContainer>
            <StyledTitle>SignUp</StyledTitle>
            <StyledLoginForm onSubmit={onSubmit}>
                <StyledInput placeholder="Identifier" onChange={(event)=>{setIdentifier(event.target.value)}}></StyledInput>
                <StyledInput placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></StyledInput>
                <StyledButton type="submit">SignUp</StyledButton>
            </StyledLoginForm>
        </StyledContainer>
    )
}

export default withRouter(SignUp)
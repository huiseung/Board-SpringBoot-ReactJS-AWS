import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PAGE_URL } from '../../utils/uris'
import styled from 'styled-components'
import Logout from '../auth/Logout'

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    padding: 0;
    #dummy{
        flex:1;
    }
`

const StyledButton = styled.button`
    background-color: white;
    color: black;
    border-radius: 20px;
    margin-left: 1rem;
`


const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`

export default function NavBar(){
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    console.log("navBar", loginData)

    return(
        <Fragment>
            <StyledNav>
                <Link to = {PAGE_URL.HOME}>MyBoard</Link>
                <div id="dummy"></div>
                <Link to={PAGE_URL.POSTWITE}><StyledButton>Write</StyledButton></Link>
                {
                    (loginData === null)?(
                        <Fragment>
                            <Link to={PAGE_URL.LOGIN}><StyledButton>Login</StyledButton></Link>
                            <Link to={PAGE_URL.SIGNUP}><StyledButton>SignUp</StyledButton></Link>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Logout></Logout>
                        </Fragment>
                    )
                }
            </StyledNav>
            <StyledHr/>
        </Fragment>

    )
}
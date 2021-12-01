import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PAGE_URL } from '../../utils/uris'
import styled from 'styled-components'
import Logout from '../auth/Logout'

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    #dummy{
        flex:1;
    }
`

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
                <Link to = {PAGE_URL.HOME}>
                    <div style={
                        {
                            "fontFamily": "monospace",
                            "fontWeight": "bold",
                            "fontSize": "1.3rem",
                        }}>My Board</div>
                </Link>
                <div id="dummy"></div>
                {
                    (loginData === null)?(
                        <Fragment>
                            <Link to={PAGE_URL.LOGIN}><StyledButton>로그인</StyledButton></Link>
                            <Link to={PAGE_URL.SIGNUP}><StyledButton>회원가입</StyledButton></Link>
                        </Fragment>
                    ):(
                        <Fragment>
                            <h4 style={{"marginRight": "1rem"}}>Author: {loginData?.nickName}</h4>
                            <StyledButton style={{"marginRight": "1rem"}}><Link  to={PAGE_URL.POSTWITE}>Write</Link></StyledButton>
                            <Logout></Logout>
                        </Fragment>
                    )
                }
            </StyledNav>
            <StyledHr/>
        </Fragment>

    )
}
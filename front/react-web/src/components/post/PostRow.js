import { Fragment } from "react"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import defaultThumbnail from "../../utils/images/defaultThumbnail.png"
import { API_BASE_URL } from "../../utils/uris"

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 20rem;
    background: white;
    border-radius: 4px;
    
    margin: 1rem;
    
    overflow: hidden;

`

const StyledThumbnail = styled.img`
    width: 100%;
`

const StyledTitle = styled.div`
    color: #242b32;
    padding-left: 1rem;

    font-weight: bold;
    
`

const StyledPrevContent = styled.p`
    padding: 0.3rem 1rem 0.3rem 1rem;
    font-color: #bec1c3;
    font-size: 0.875rem;
    
    height: 4rem;
    max-width: 20rem;

    overflow: hidden;
    text-overflow: ellipsis;
`

const StyledCategory = styled.div`
    padding-left: 1rem;
    color: #c8cbcf;
`

const StyledCreateAt = styled.div`
    padding-left: 1rem;
    color: #c8cbcf;
`

const StyledAuthor = styled.div`
    padding: 0.5rem 0 0.5rem 1rem;
    color: #343a40;
    border-top: 1px solid rgb(248, 249, 250);
`



export default function PostRow(props){
    return(
        <StyledCard>
            {
                (props.thumbnail === null || props.thumbnail === undefined)? 
                (<Fragment>
                    <Link to={'/posts/'+props.postId}>
                        <StyledThumbnail src={defaultThumbnail}></StyledThumbnail>
                    </Link>
                </Fragment>): 
                (<Fragment>
                    <Link to={'/posts/'+props.postId}>
                        <StyledThumbnail src={API_BASE_URL+"/images?fileName="+props.thumbnail}></StyledThumbnail>
                    </Link>
                </Fragment>)
            }
            <div style={{"marginBottom": "1rem"}}>
                {console.log("postId ",props.postId)}                
                <Link to={'/posts/'+props.postId}>
                    <StyledTitle>{props.title}</StyledTitle>
                    <StyledPrevContent>{props.prevContent}</StyledPrevContent>
                </Link>
                <StyledCategory>category: {props.category}</StyledCategory>
                <StyledCreateAt>day: {props.createAt}</StyledCreateAt>
            </div>
            <StyledAuthor>by {props.author}</StyledAuthor>
        </StyledCard>
    )
}
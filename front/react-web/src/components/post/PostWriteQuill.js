import ReactQuill, {Quill} from 'react-quill'
import ImageResize from 'quill-image-resize'
import "react-quill/dist/quill.snow.css";
import { useHistory} from 'react-router-dom'
import { useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch } from 'react-redux'
import { postPostThunk } from '../../reducers/post/postPost'
import { PAGE_URL } from '../../utils/uris';


const StyledConatiner = styled.div`
`

const StyledTitle = styled.h1`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const StyledTitleInput = styled.input`
    display: flex;
    flex-direction: row;

    height: 2rem;
    width: 50rem;
    background-color: gainsboro;
    border: 0;
`

const StyledHr = styled.hr`
    solid: 10px;
    margin-bottom: 1rem;
`

const StyledSubmitButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 10rem;
    height: 3rem;
    background-color: white;
    color: black;
    border-radius: 20px;

    margin: 1rem;
`

const StyledSelect = styled.select`
    width: 100px;
    height: 20px;

    margin-left: 1rem;

    border-radius: 5px;
    text-align: center;
`

function PostWriteQuill(){
    const [category, setCategory] = useState("MOVIE")
    const [title, setTittle] = useState("")
    const [value, setValue] = useState("")
    const quillRef = useRef()
    const [images, setImages] = useState([])
    const history = useHistory()
    const {loading: loginLoading, data: loginData, error: loginError} = useSelector(state=>state.loginReducer)
    const {loading: postPostLoading, data: postPostData, error: postPostError} = useSelector(state=>state.postPostReducer)


    Quill.register('modules/ImageResize', ImageResize)

    const modules = useMemo(
        ()=>{
            return {
                toolbar:{
                    container:[
                        [{header: [1, 2, 3, false]}],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image'],
                        [{ align: [] }, { color: [] }, { background: [] }], 
                    ],
                },
                ImageResize:{
                    parchment: Quill.import('parchment')
                }
            }
        }
    ,[])

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
    ]

    const author = "testId"
    //const category = "MOVIE"

    const dispatch = useDispatch()
    const onSubmit = ()=>{
        console.log("title", title)
        console.log("content", JSON.stringify(value))
        const formData = new FormData()
        let textForm = {
            title: title,
            content: value,
            author: author,
            category: category
        }
        for(let i=0; i < images.length;i++){
            formData.append("images", images[i], images[i].name)
        }
        console.log("images", formData.getAll("images"))
        formData.append("data", new Blob([JSON.stringify(textForm)], {type:"application/json"}))     
        dispatch(postPostThunk(formData))   
    }

    useEffect(()=>{
        if(loginLoading===false && loginData === null){
            history.push(PAGE_URL.LOGIN)
        }
    }, [history, loginLoading, loginData])


    return(
        <StyledConatiner>
            <StyledTitle>Cotito, ergo sum</StyledTitle>
            
            <div style={{"display": "flex",
                        "alignItems": "baseline",
                        "marginBottom": "1rem"
                        }}>
                <h3>Category: </h3>
                <StyledSelect name="category" onChange={(event)=>{setCategory(event.target.value)}}>
                    <option value = "MOVIE">영화</option>
                    <option value = "NOVEL">소설</option>
                </StyledSelect>
            </div>

            <StyledTitleInput placeholder="제목을 입력해 주세요" onChange={(event)=>{setTittle(event.target.value)}}/>
            <StyledHr/>
            <div style={{"height":'500px',
                          "marginBottom": "2rem"}}>
                <ReactQuill
                    ref = {quillRef}
                    style={{height:'450px'}}
                    theme="snow"
                    placeholder="내용을 입력해 주세요"
                    value={value}
                    onChange={(content, delta, source, editor)=>setValue(editor.getHTML)}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <div>
                <input style={{}} type="file" multiple="multiple" onChange={(event)=>{setImages(event.target.files)}}></input>

            </div>
            <div style={{"display": "flex",
                        "flexDirection": "row",
                        "justifyContent": "center"}}>
                <StyledSubmitButton onClick={onSubmit}>Submit</StyledSubmitButton>
                <StyledSubmitButton onClick={()=>{history.goBack()}}>Back</StyledSubmitButton>
            </div>

        </StyledConatiner>       
    )   
}

export default PostWriteQuill
import React, { useEffect, useRef, useState } from "react";
import ReactQuill, {Quill} from 'react-quill';
import { Button, TextField} from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { useRouter } from 'next/router' 

const TextRich = ({titleProp, contentProp, idProp}) => {
  console.log('TestRIch: ',titleProp, contentProp, idProp);
  const router = useRouter()

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');


  useEffect(() => {
    setValue(contentProp);
    setTitle(titleProp);
    setId(idProp);
  }, [titleProp, contentProp, idProp])
  const inputEl = useRef(null);


  const imageHandler = () => {
    const range = inputEl.current.getEditor().getSelection();
    const value = prompt('Insert image URL');
    if (value){ 
      inputEl.current.getEditor().insertEmbed(range.index, 'image', value); //, Quill.sources.USER
    }
  }
  const QuillModules = {
    // ImageResize: {
    //   modules: [ Resize ],
    // },
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        ["bold", "italic", "underline", "strike", { color: ['red','blue'] }, { background: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { align: [] }
        ],
        ["link", "image"],
        ["clean"]
        ['code-block'],
      ],
    //   handlers: {
    //     image: imageHandler
    // },
  },
    clipboard: {
      matchVisual: false,
    }
  }

  
  const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
  ];

  const dispatch = useDispatch();
  const quillSubmit = (e) => {
    if(router.asPath.endsWith('new')){
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title,
          content:value,
        },
      }); 
    }
    else{
      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          title,
          content:value,
          id: id,
        }
      })
    }
      
  }
  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  return (
    <>
      <div style={{backgroundColor:'gery', marginTop:20, marginLeft:20, marginRight:20}}>
        <TextField
              label="Title"
              id="blog_title"
              margin="normal"
              variant="outlined"
              onChange={titleHandler}
              style={{width:'100%'}}
              label={title}
            />
        <ReactQuill 
          ref={inputEl} 
          theme="snow" 
          value={value || ''} 
          onChange={setValue} 
          style={{height:450}}
          modules={QuillModules}
          formats={QuillFormats}
        />
        <Button onClick={quillSubmit}>Submit</Button>
      </div>
    </>
  );
}

export default TextRich;

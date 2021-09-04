import React, { useEffect, useRef, useState } from "react";
import { Button, TextField} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { useRouter } from 'next/router' 
import { Editor } from '@tinymce/tinymce-react'

const TextRich = ({titleProp, contentProp, idProp}) => {
  const router = useRouter()

  const [value, setValue] = useState('');
  // const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    console.log('title', title, titleProp)
    setValue(contentProp);
    setTitle(titleProp);
    setId(idProp);
  }, [titleProp, contentProp, idProp])
  const inputEl = useRef(null);

  const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
  

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
    } else {
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
      <div style={{marginTop:20, marginLeft:20, marginRight:20}}>
        <TextField
          id="blog_title"
          margin="normal"
          variant="outlined"
          onChange={titleHandler}
          style={{width:'100%'}}
          label={"Title"}
          value={title}
        />
        <Editor
         apiKey='9p9f0eymaqvyy6mlg0ny191sn3w8rx25uq8mwdj7fstwe1dr'
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'image | undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            // setText(editor.getContent({format: 'text'}));
          }}
        value={value || ''}
         
      />
        <Button onClick={quillSubmit}>Submit</Button>
      </div>
    </>
  );
}

export default TextRich;

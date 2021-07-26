import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button, TextField} from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST} from '../reducers/post'
import AppLayout2 from "./AppLayout2";


const QuillModules = {
  toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
  ]
};

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

const TextRich = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const quillSubmit = (e) => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        title,
        content:value,
      },
    });
  }
  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  return (
    <>
    <AppLayout2>
      <div style={{backgroundColor:'gery', marginTop:20, marginLeft:20, marginRight:20}}>
        <TextField
              label="Title"
              id="blog_title"
              margin="normal"
              variant="outlined"
              onChange={titleHandler}
              style={{width:'100%'}}
            />
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={setValue} 
          style={{height:450}}
          modules={QuillModules}
          formats={QuillFormats}
        />
        <Button onClick={quillSubmit}>Submit</Button>
      </div>
    </AppLayout2>
    </>
  );
}

export default TextRich;

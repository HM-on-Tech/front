import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button, TextField} from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';


function TextRich3() {
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
    <TextField
          label="Title"
          id="blog_title"
          helperText="Enter title"
          margin="normal"
          variant="outlined"
          onChange={titleHandler}
        />
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
    <Button onClick={quillSubmit}>Submit</Button>
    </>
  );
}

export default TextRich3;
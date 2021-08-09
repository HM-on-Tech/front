import React, { useRef, useState } from "react";
import ReactQuill, {Quill} from 'react-quill';
import { Button, TextField} from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST} from '../reducers/post'
import AppLayout from "./AppLayout";
import AdminLayout from "./AdminLayout";
// import { ImageResize } from 'quill-image-resize-module';

// Quill.register('modules/imageResize', ImageResize);

import Admin from '../helper/admin';
const TextRich = () => {
  const inputEl = useRef(null);

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  // const imageHandler = () => {
  //   const range = inputEl.current.getEditor().getSelection();
  //   const value = prompt('Insert image URL');
  //   if (value){ 
  //     inputEl.current.getEditor().insertEmbed(range.index, 'image', value); //, Quill.sources.USER
  //   }
  // }
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
    <AppLayout>
      <Admin>
        <AdminLayout>
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
            ref={inputEl} 
            theme="snow" 
            value={value} 
            onChange={setValue} 
            style={{height:450}}
            modules={QuillModules}
            formats={QuillFormats}
          />
          <Button onClick={quillSubmit}>Submit</Button>
        </div>
        </AdminLayout>
      </Admin>
    </AppLayout>  
    </>
  );
}

export default TextRich;

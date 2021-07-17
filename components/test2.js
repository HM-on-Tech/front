import react, { useState, useCallback } from 'react';
import CKEditor from 'react-ckeditor-component';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { TextField } from '@material-ui/core';


const textContent =
'<h2>Awesome Rich Content</h2>\n' +
'<p>Suspendisse id sollicitudin dui. <strong>Vestibulum eu sapien pharetra,</strong> bibendum ligula id, ullamcorper ligula.</p>\n' +
'\n' +
'<ul>\n' +
'        <li>ullamcorper ligula</li>\n' +
'        <li>Duis vel neque</li>\n' +
'</ul>\n' +
'\n' +
'<p><em>Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat. </em></p>\n';


export default function MyEditor ({ content, setContent }) {
  const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
      backgroundColor: 'white',
    },
  }));
  const classes = useStyles();

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
const onChange = (evt) => {
  // const newContent = evt.editor.getData();
  // setContent(newContent);
};

const onBlur = (evt) => {
  // console.log('onBlur event called with event info: ', evt);
};

const afterPaste = (evt) => {
  // console.log('afterPaste event called with event info: ', evt);
};

  return (
    <div className='App'>
      <TextField
          label="Title"
          id="blog_title"
          helperText="Enter title"
          margin="normal"
          variant="outlined"
          onChange={titleHandler}
          className={classes.textField}
        />
      <CKEditor
        activeClass="p10"
        content={content}
        events={{
          blur: onBlur,
          afterPaste: afterPaste,
          change: onChange,
        }}
      />
      {/* <Button onClick={addBlogSubmit}>Submit</Button> */}
    </div>
    
  )
}
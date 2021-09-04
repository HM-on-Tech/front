import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { useRouter } from 'next/router' 
import React, { useEffect, useRef, useState } from "react";


const TextRichEditor = () => {
  const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };

  return(
    <>
     <Editor
         apiKey='9p9f0eymaqvyy6mlg0ny191sn3w8rx25uq8mwdj7fstwe1dr'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
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
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <button onClick={log}>Log editor content</button>
    </>
  )
  
}

export default TextRichEditor;
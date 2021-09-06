import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { useRouter } from 'next/router' 
import tinymce from 'tinymce';


const TextRichEditor = () => {

  const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };

   // preview plugin
   tinymce.init({
    theme : "advanced",
    mode : "textareas",
    plugins : "preview",
    theme_advanced_buttons3_add : "preview",
    plugin_preview_width : "500",
    plugin_preview_height : "600"
    });

  return(
    <>
     <Editor
         apiKey={proecss.env.REACT_APP_TINY_API}
         onInit={(evt, editor) => editorRef.current = editor}
          //  initialValue="<p>This is the initial content of the editor.</p>"
         init={{
          selector: 'textarea',
          mobile: {
            plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
          },
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'image imagetools',
            'image'
          ],
          toolbar: 'image preview | undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent ' +
          'removeformat | help',
          
          
          // preview button won't show
          // theme_advanced_buttons1_add : "preview", 
          // plugin_preview_width : "500",
          // plugin_preview_height : "600",

          // settings for imagetools that won't work
          imagetools_cors_hosts: [ 'localhost:3000' ], 
          imagetools_proxy: 'proxy.php',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }} 
       />
       <button onClick={log}>Log editor content</button>
    </>
  )
  
}

export default TextRichEditor;
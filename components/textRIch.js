import React, { useEffect, useRef, useState } from "react";
import { Button, TextField} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { useRouter } from 'next/router' 
import { Editor } from '@tinymce/tinymce-react'
import { toast } from "react-toastify";



const TextRich = ({postInfo}) => {
  const toastId = React.useRef(null);
  
  const notify = () => {
    console.log(toast.isActive(toastId.current))
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast.error('Not a Valid Image. Must start with "https://"');
    }
  }
  const router = useRouter()

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (postInfo != null){
      setValue(postInfo.content);
      setTitle(postInfo.title);
      setId(postInfo.id);
      setAuthor(postInfo.author)
      setThumbnail(postInfo.thumbnail)
    }
    
  }, [postInfo])
  const inputEl = useRef(null);

  const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
  

  const dispatch = useDispatch();
  const articleSubmit = (e) => {
    if(router.asPath.endsWith('new')){
      if (! thumbnail.startsWith('http')){
        return ;
      }
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title,
          content:value,
          author:author,
          thumbnail:thumbnail,
        },
      }); 
    } else {
      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          title,
          content:value,
          id: id,
          author:author,
          thumbnail:thumbnail,
        }
      })
    }
      
  }

const cancelSubmit = (e) => {
  router.back()
    
}

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const authorHandler = (e) => {
    setAuthor(e.target.value)
  }

  const thumbnailHandler = (e) => {
    setThumbnail(e.target.value)
  }


  return (
    <>
      <div style={{marginTop:20, marginLeft:20, marginRight:20}}>
        <TextField
          id="blog_title"
          margin="dense"
          variant="outlined"
          onChange={titleHandler}
          style={{width:'100%'}}
          label={"Title"}
          value={title}
          size="medium"
        />
        <TextField
          style={{marginTop:-5, marginBottom:10}}
          id="article_author"
          margin="dense"
          variant="outlined"
          size="small"
          onChange={authorHandler}
          style={{width:'100%'}}
          label={"By"}
          value={author}
        />
        <TextField
          style={{marginTop:-5, marginBottom:10}}
          id="article_author"
          margin="dense"
          variant="outlined"
          size="small"
          onChange={thumbnailHandler}
          style={{width:'100%'}}
          label={"Thumbnail URL"}
          value={thumbnail}
        />
        <img
          hidden
          src={thumbnail}
          onError={() => {
            if(thumbnail === '') return
            notify()

          }}
          onLoad={() => {
            if (thumbnail.startsWith('http')){
              toast.success('Thumbnail Successfully Loaded')
            } else {
              toast.error('Not a Valid Image. Must start with "https://"')
            }
          }}
        />
        
        <Editor
         apiKey={process.env.TINY_API_KEY} // referencing a .env var?
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'image preview | undo redo | formatselect' +
           'bold italic | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
          }}
        value={value || ''}
         
      />
        <Button onClick={articleSubmit}>Submit</Button>
        <Button onClick={cancelSubmit}>Cancel</Button>
      </div>
    </>
  );
}

export default TextRich;

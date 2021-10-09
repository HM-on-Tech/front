import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router' 
import { toast } from "react-toastify";
import { Editor } from '@tinymce/tinymce-react'
import { Box, Button, Grid, TextField} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';


import { ADD_POST_REQUEST, EDIT_POST_REQUEST, EDIT_POST_FAILURE } from '../reducers/post'
import { LOAD_PUBLICATION_REQUEST } from "../reducers/publication";
import { Label } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft:15,
    [theme.breakpoints.down('md')]: {
      width:'40%',
    },
    [theme.breakpoints.up('md')]: {
      width:'73%',
    },
  },
}));

const TextRich = ({postInfo}) => {
  const toastId = React.useRef(null);
  const classes = useStyles();
  const { userId } = useSelector(state => state.user)
  

  const notify = () => {
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast.error('Not a Valid Image. Must start with "https://"');
    }
  }
  const router = useRouter()

  const [value, setValue] = useState('');
  const [volume, setVolume] = useState(0);
  const [issue, setIssue] = useState(0);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [publication, setPublication] = useState(1);
  const [validImage, setValidImage] = useState(false);
  const { publicationList } = useSelector(state => state.publication)

  const dispatch = useDispatch();

  useEffect(() => {
    if (postInfo != null){
      setValue(postInfo.content);
      setTitle(postInfo.title);
      setId(postInfo.id);
      setAuthor(postInfo.author);
      setThumbnail(postInfo.thumbnail);
      setPublication(postInfo.PublicationId);
      setVolume(postInfo.volume);
      setIssue(postInfo.issue);
    }
    
  }, [postInfo])

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_PUBLICATION_REQUEST,
  //   })
  // }, [])
  const inputEl = useRef(null);

  const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
      }
    };
  const nullCheck = (value, valueName) => {
    console.log(value,valueName)
    if (value == null || value.trim() === '') {
      toast.warning(`no ${valueName}`);
      return ;
    }
  }
  const zeroCheck = (value, valueName) => {
    if (value == null || value === 0) {
      toast.warning(`no ${valueName}`);
      return ;
    }
  }
  const articleSubmit = (e) => {
    if(router.asPath.endsWith('new')){
      nullCheck(title,'title');
      nullCheck(author, 'author');
      nullCheck(value, 'content');
      nullCheck(thumbnail, 'thumbnail');
      zeroCheck(publication,'publication' );
      zeroCheck(volume,'volume' );
      zeroCheck(issue,'issue' );
      
      if (!validImage) {
        toast.warning(`image is not valid`);
        return ;
      }
      if (thumbnail.startsWith('http')){
        dispatch({
          type: ADD_POST_REQUEST,
          data: {
            title,
            content:value,
            author:author,
            thumbnail:thumbnail,
            PublicationId: publication,
            UserId: userId,
            volume,
            issue,
          },
        }); 
      }
    } else {
      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          title,
          content:value,
          id: id,
          author:author,
          thumbnail:thumbnail,
          PublicationId: publication,
          volume,
          issue,
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

  const handleChange = (event) => {
    setPublication(event.target.value);
  };
  const volumeHandler = (event) => {
    setVolume(event.target.value);
  };
  const issueHandler = (event) => {
    setIssue(event.target.value);
  };

  return (
    <>
      <div style={{marginTop:20, marginLeft:20, marginRight:20}}>
        <TextField
          id="blog_title"
          margin="dense"
          variant="outlined"
          onChange={titleHandler}
          label={"Title"}
          value={title}
          size="medium"
          style={{width:'100%'}}
        />
        {console.log('publication', publication)}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Pulication</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publication}
            onChange={handleChange}
            style={{minWidth: 100, marginRight:10}}
          >
            {
              publicationList?.map(
                (publication) => (
                <MenuItem 
                  key={`${publication.name}-${publication.id}`}
                  value={publication.id}
                >
                  {publication.name}
                </MenuItem>
                )
              )
            }
          </Select>
        </FormControl>
        <TextField
          style={{marginTop:-5, marginBottom:10}}
          id="article_author"
          margin="dense"
          variant="outlined"
          size="small"
          onChange={authorHandler}
          label={"By"}
          value={author}
          className={classes.root}
          style={{width: window.innerWidth < 700 ? '40%' : '76%', marginLeft:15}}
        />
        <TextField
          id="volume-number"
          label="Vol."
          type="number"
          value={volume}
          onChange={volumeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="issue-number"
          label="Issue."
          type="number"
          onChange={issueHandler}
          value={issue}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
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
            setValidImage(false);
            if(thumbnail === '') return
            notify()

          }}
          onLoad={() => {
            if (thumbnail.startsWith('http')){
            setValidImage(true);
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

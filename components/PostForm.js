import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon, TextField, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import Chip from '@material-ui/core/Chip';

import { ADD_POST_REQUEST } from '../reducers/post';

import useInput from '../useInput/useInput';
const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexDirection: 'row',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '8rem',
        },
    button:{
      marginTop:10,
      width:100,
    },
    typography:{
      ...theme.typography,
      align:'center',
    }
,
}));

export default function PatientForm() {
  const [title, onChangeTitle,setTitle] = useInput('');
  const [content, onChangeContent,setContent] = useInput('');

  const dispatch = useDispatch();
  const classes = useStyles();

  /**
   * Input form for the Patient Information
   * 
   * 
   */
  const formsubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title,
          content,
        },
      });
    setTitle('')
    setContent('')
  },[title, content])

  
  return (
    <form className={classes.root} noValidate autoComplete="off">
        {/* <Typography className={classes.typography} text="Input for Patient"/> */}
        <Chip label="Post" variant="outlined" style={{marginTop:15}}/>
        
      <TextField
        label="Title"
        id="title"
        value = {title}
        className={classes.textField}
        onChange={onChangeTitle}
      />
      <TextField
        label="Content"
        id="content"
        className={classes.textField}
        value = {content}
        onChange={onChangeContent}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={formsubmit}
        >
        Input
      </Button>
    </form>
  );
}
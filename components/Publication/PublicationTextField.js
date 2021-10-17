import React, { useEffect, useRef, useState } from "react";
import { Button, TextField} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ADD_PUBLICATION_REQUEST, EDIT_PUBLICATION_REQUEST, EDIT_PUBLICATION_FAILURE } from '../../reducers/publication'
import { useRouter } from 'next/router' 



const PublicationTextField = ({publicationInfo}) => {
  const router = useRouter()

  // const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (publicationInfo != null){
      setValue(publicationInfo.content);
      setName(publicationInfo.name);
      setId(publicationInfo.id);
    }
    
  }, [publicationInfo])

  const dispatch = useDispatch();
  const publicationSubmit = (e) => {
    dispatch({
      type: ADD_PUBLICATION_REQUEST,
      data: {
        name: name,
      },
    });
    setName('');
  }

const cancelSubmit = (e) => {
  router.back()
}

const nameHandler = (e) => {
  setName(e.target.value)
}


  return (
    <>
      <div style={{marginTop:20,  marginRight:20,
      display:'flex', flexDirection:'row'}}>
        <TextField
          id="publication_name"
          margin="dense"
          variant="outlined"
          onChange={nameHandler}
          style={{width:'50%'}}
          label={"Name"}
          value={name}
          size="medium"
        />
        <Button onClick={publicationSubmit}>Submit</Button>
        <Button onClick={cancelSubmit}>Cancel</Button>
      </div>
    </>
  );
}

export default PublicationTextField;

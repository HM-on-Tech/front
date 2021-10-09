import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router' 
import { Editor } from '@tinymce/tinymce-react'
import { toast } from "react-toastify";


const UserManager = ({
  setUserList,
  mode,
  setMode,
  selectedElement,
  setEmail,
  setName,
  setRole,
  email,
  name,
  role
}) => {
  const router = useRouter()
  const { publicationList } = useSelector(state => state.publication)
  const { userId } = useSelector(state => state.user)

  
  const [organization, setOrganization] = useState(0);

  const dispatch = useDispatch();
  const addUserSubmit = async (e) => {

    // Edit only
    if (mode === 'Edit') {
      if (selectedElement.length !== 1) {
        toast.warning(`please select one to edit`);
        return
      }
      if ( email.trim() === '' || name.trim() === '') {
        toast.warning(`please fill in blank `);
        return 
      }
      const result = await axios.post(`http://localhost:3065/api/user/edit`,
      { email, name, role, targetUserId: selectedElement[0] })

      setUserList( (prev) => {
        return prev.map( (element) => {
          if (element.id === result.data.id) {
            return result.data;
          } else {
            return element;
          }
        });
      })
      toast.success('Edit success');
      setEmail('');
      setName('');
      setRole(1);
      return;
    }

    // New only
    const result = await axios.post('http://localhost:3065/api/user/add',
    { email, name, role })

    if( result.data?.status === 1) {
      toast.warning(result.data?.message);
    } else {
      setUserList( (prev) => {
        if (result.data?.role === 1) {
          return [
            ...prev,
            {
              ...result.data,
              role: 'editor',
            }
          ]
        } else {
          return [
            ...prev,
            {
              ...result.data,
              role: 'admin',
            }
          ]

        }
      })
      toast.success('User created');
      setEmail('');
      setName('');
      setRole(1);
    }
  }


  const nameHandler = (e) => setName(e.target.value)
  const emailHandler = (e) => setEmail(e.target.value)
  const organizationHandler = (e) => setOrganization(e.target.value)
  const roleHandler = (e) => setRole(e.target.value)

  const modeButton = () => {
    setMode((prev) => {
      if (prev === 'New') return 'Edit';
      return 'New'
    })
  }

  return (
    <>
      <div style={{marginTop:20,  marginRight:20,
      display:'flex', flexDirection:'row'}}>
          <Button variant="text" onClick={modeButton}>{mode}</Button>
          <FormControl fullWidth>
            <InputLabel id="role-inputLabel">Role</InputLabel>
            <Select
              labelId="role-select"
              id="role-select"
              value={role}
              label="Role"
              onChange={roleHandler}
            >
              <MenuItem value={1}>Editor</MenuItem>
              <MenuItem value={2}>Admin</MenuItem>
            </Select>
          </FormControl>
        <TextField
          id="name"
          margin="dense"
          variant="outlined"
          onChange={nameHandler}
          style={{width:'50%'}}
          label={"Name"}
          value={name}
          size="medium"
        />
        <TextField
          id="email"
          margin="dense"
          variant="outlined"
          onChange={emailHandler}
          style={{width:'50%'}}
          label={"email"}
          value={email}
          size="medium"
        />
        <Button onClick={addUserSubmit}>Submit</Button>
        {/* <Button onClick={cancelSubmit}>Cancel</Button> */}
      </div>
    </>
  );
}

export default UserManager;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_PUBLICATION_REQUEST, ADD_PUBLICATION_REQUEST, LOAD_PUBLICATION_REQUEST } from '../reducers/publication';
import { toast } from 'react-toastify';
import router from 'next/router';

const UserList = ({
  userList,
  setUserList,
  setSelectedElement,
  selectedElement,
  setName,
  setEmail,
  setRole,
}) => {
  const [row, setRow] = useState([]);
  const dispatch = useDispatch();

  useEffect( async () => {
    const users  = await axios.post('/user/list');
    setUserList(users.data)
  }, [])

  useEffect(() => {
    setRow(userList);
  }, [userList])

  const deleteUser = async () => {
    if (selectedElement.length === 0){
      toast.warning('please select user to remove')
      return;
    }
    const result = await axios.post(`/user/remove`,selectedElement)
    setUserList( (prev) => {
      let filterIDs = result.data?.map( (x)=> parseInt(x) )
      const values = prev.filter( (v) => !filterIDs.includes(v.id));
      return values
    })
    setEmail('');
    setName('');
    setRole(1);
    toast.success('user deleted');
  }
  
  const columns = [
    { field: 'name', flex:1 },
    { field: 'email', flex:1 },
    { field: 'role', flex:1 },
  ]
  
  return (
    <>
      <Button onClick={deleteUser}> Delete </Button>
      <div style={{ height: 1000 }}>
        <DataGrid
          columns={columns}
          rows={row}
          checkboxSelection={true}
          onSelectionModelChange={(model) => {
            setSelectedElement(model.selectionModel)
          }}
        />
      </div>
    </>
  )
}

export default UserList;

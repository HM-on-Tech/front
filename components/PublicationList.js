import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_PUBLICATION_REQUEST, ADD_PUBLICATION_REQUEST, LOAD_PUBLICATION_REQUEST } from '../reducers/publication';
import Router from 'next/router';
import { toast } from 'react-toastify';
import router from 'next/router';

const PublicationList = () => {
  const [row, setRow] = useState([]);

  const dispatch = useDispatch();
  const { publicationList } = useSelector(state => state.publication)

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect( async () => {
    dispatch({
      type: LOAD_PUBLICATION_REQUEST,
    })
    //  Request post lists to the server directly
    // const result  = await axios.post('http://localhost:3065/api/posts/list');
    // console.log('result from server', result)
  },[])

  useEffect(() => {
    setRow(publicationList);
  },[publicationList.length])

  const deletePublication = () => {
    if (selectionModel.length === 0){
      toast.warning('please select publication to remove')
      return;
    }
    dispatch({
      type: REMOVE_PUBLICATION_REQUEST,
      data: selectionModel
    })
    console.log('delete publication', selectionModel)
  }

  const addPublication = () => {
    dispatch({
      type: ADD_PUBLICATION_REQUEST,
      data: selectionModel
    })
    console.log('add publication', selectionModel)
  }
  
  const columns = [
    { field: 'publications', flex:1 }
  ]
  
  return (
    <>
      <Button onClick={() => router.push('/admin/new')}> New </Button>
      <Button onClick={deletePublication}> Delete </Button>
      <div style={{ height: 1000, width: 600 }}>
        <DataGrid
          columns={columns}
          rows={row}
          checkboxSelection={true}
          onSelectionModelChange={(model) => {
            setSelectionModel(model.selectionModel);
          }}
        />
      </div>
    </>
  )
}

export default PublicationList;

import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_PUBLICATION_REQUEST, ADD_PUBLICATION_REQUEST, LOAD_PUBLICATION_REQUEST } from '../../reducers/publication';
import { toast } from 'react-toastify';

const PublicationList = () => {
  const [row, setRow] = useState([]);

  const dispatch = useDispatch();
  const { publicationList } = useSelector(state => state.publication)

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect( async () => {
    dispatch({
      type: LOAD_PUBLICATION_REQUEST,
    })
  },[])

  useEffect(() => {
    setRow(publicationList);
  },[publicationList.length])

  const deletePublication = () => {
    if (selectionModel.length === 0){
      toast.warning('Please select a publication')
      return;
    }
    dispatch({
      type: REMOVE_PUBLICATION_REQUEST,
      data: selectionModel
    })
  }
  
  const columns = [
    { field: 'name', flex:1 }
  ]
  
  return (
    <>
      <Button onClick={deletePublication}> Delete </Button>
      <div style={{ height: 1000 }}>
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

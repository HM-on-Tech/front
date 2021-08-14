import { useState } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_POSTS_REQUEST } from '../reducers/posts';

const ArticleList = () => {
  const dispatch = useDispatch();

  const [selectionModel, setSelectionModel] = useState([]);

  const deleteArticle = () => {
    dispatch({
      type: REMOVE_POSTS_REQUEST,
      data: selectionModel
    })
    console.log('delete rows', selectionModel)
    
  }
  const columns = [
    { field: 'Author', flex:1 },
    { field: 'title', flex:2 },
    { field: 'CreatedAt', flex:1 },
  ]

  const rows = [
    { id: 1, Author:'a', name: 'React', title: 'title' },
    { id: 2, Author:'a',name: 'Material-UI', title: 'title' },
    { id: 3, Author:'a',name: 'Material-UI', title: 'edit' },
    { id: 4, Author:'a',name: 'Material-UI', title: 'delete' },
  ]
  return (
    <>
      <Button> New </Button>
      <Button> Edit </Button>
      <Button onClick={deleteArticle}> Delete </Button>
      <div style={{ height: 1000, width: 600 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          checkboxSelection={true}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
      </div>
    </>
  )
}

export default ArticleList;

import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST, REMOVE_POSTS_REQUEST } from '../reducers/posts';
import Router from 'next/router';

const ArticleList = () => {
  const [row, setRow] = useState([]);

  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.posts)

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect( async () => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
    //  Request post lists to the server directly
    // const result  = await axios.post('http://localhost:3065/api/posts/list');
    // console.log('result from server', result)
  },[])

  useEffect(() => {
    setRow(mainPosts);
  },[mainPosts.length])

  const deleteArticle = () => {
    dispatch({
      type: REMOVE_POSTS_REQUEST,
      data: selectionModel
    })
    console.log('delete rows', selectionModel)
    
  }
  
  const editArticle = () => {
    Router.push(`/admins/edit/${selectionModel.selectionModel[0]}`)
  }


  const columns = [
    { field: 'Author', flex:1 },
    { field: 'title', flex:2 },
    { field: 'createdAt',
      flex:1 ,
      valueFormatter: (params) => {
        return `${params.value.split('T')[0]}`;
      },
  
    },
  ]
  
  return (
    <>
      <Button> New </Button>
      <Button onClick={editArticle}> Edit </Button>
      <Button onClick={deleteArticle}> Delete </Button>
      <div style={{ height: 1000, width: 600 }}>
        <DataGrid
          columns={columns}
          rows={row}
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

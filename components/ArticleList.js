import { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST, REMOVE_POSTS_REQUEST } from '../reducers/posts';
import Router from 'next/router';
import { toast } from 'react-toastify';
import router from 'next/router';

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
    if (selectionModel.length === 0){
      toast.warning('please select article to delete')
      return;
    }
    dispatch({
      type: REMOVE_POSTS_REQUEST,
      data: selectionModel
    })
    console.log('delete rows', selectionModel)
  }
  
  const editArticle = (length) => {
    if (length === 0){
      toast.warning('please select article to edit')
    }
    if (length > 1){
      toast.warning('please select one article at a time')
    }
    if (length === 1){
      Router.push(`/admin/edit/${selectionModel[0]}`)
    }
  }


  const columns = [
    { field: 'author', flex:1 },
    { field: 'title', flex:2 },
    { field: 'createdAt', flex:1 ,
      valueFormatter: (params) => {
        return `${params.value.split('T')[0]}`;
      },
    },
    { field: 'viewCount', flex:1},
  ]
  
  const columnsForMobile = [
    { field: 'title', flex:2 },
  ]

  return (
    <>
      <Button onClick={() => router.push('/admin/new')}> New </Button>
      <Button onClick={() => editArticle(selectionModel.length)}> Edit </Button>
      <Button onClick={deleteArticle}> Delete </Button>
      <Box
        component={Grid}
        item
        xs={12}
        display={{ xs: "none", sm: "none",md:"block", lg: "block" }}
      >
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={row}
            checkboxSelection={true}
            onSelectionModelChange={(model) => {
              setSelectionModel(model.selectionModel);
            }}
          />
        </div>
      </Box>
      <Box
        component={Grid}
        item
        xs={12}
        display={{ xs: "block", sm: "block",md:"none", lg: "none" }}
      >
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            columns={columnsForMobile}
            rows={row}
            checkboxSelection={true}
            onSelectionModelChange={(model) => {
              setSelectionModel(model.selectionModel);
            }}
          />
        </div>
      </Box>
    </>
  )
}

export default ArticleList;

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import AppLayout from '../../components/AppLayout'
import { useRouter } from 'next/router'
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { Grid } from '@material-ui/core';

const ArticleComponent = () => {
  const router = useRouter()
  const { article } = router.query

  const dispatch = useDispatch()
  const { mainPost, loadPostDone } = useSelector(state => state.post)
  
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: article,
    })
  }, [])


  const loaded = () => {
    if (loadPostDone) {
      return (
        <>
          <h1>{mainPost.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: mainPost.content }} />
        </>
      )
    }else{
      return <CircularProgress />

    }
  }
    return(
    <>
    <AppLayout>
      <Grid>
        {loaded()}
      </Grid>
    </AppLayout>
    </>
    )
}

export default ArticleComponent;
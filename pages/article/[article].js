import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router'
import axios from 'axios'


import AppLayout from '../../components/Layout/AppLayout'
import ArticleLayout from '../../components/Layout/ArticleLayout';
import Article from '../../components/Article'

const ArticleComponent = () => {
  const [data, setData] = useState()
  const router = useRouter()
  const { article } = router.query

  useEffect( async () => {
    const post = await axios.get(`http://localhost:3065/api/post/get/${article}`);
    setData(post.data)
  }, [])

    return(
    <>
    <AppLayout>
      <ArticleLayout >
        <Article post={data}/>
      </ArticleLayout>
        {/* {loaded()} */}
    </AppLayout>
    </>
    )
}

export default ArticleComponent;
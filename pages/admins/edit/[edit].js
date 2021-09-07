import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppLayout from '../../../components/AppLayout'
import TextRichWithNoSSR from "../../../components/textRichWithNoSSR"
import AdminLayout from '../../../components/AdminLayout'

const EditPageComponent = () => {

  const [data, setData] = useState()

  useEffect( async () => {
    const post = await axios.get(`http://localhost:3065/api/post/get/${edit}`);
    setData(post.data)
  }, [])

  const router = useRouter()

  const { edit } = router.query

  return(
  <>
    <AppLayout>
      <AdminLayout>
        <TextRichWithNoSSR postInfo={data}/>
      </AdminLayout>
    </AppLayout>
  </>
  )
}

export default EditPageComponent;
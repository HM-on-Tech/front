import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppLayout from '../../../components/AppLayout'
import TextRichWithNoSSR from "../../../components/textRichWithNoSSR"
import AdminLayout from '../../../components/AdminLayout'

const EditPageComponent = () => {

  useEffect( async () => {
    const post = await axios.get(`http://localhost:3065/api/post/get/${edit}`);
    console.log(post.data)
    const {id, title, content} = post.data;
    setId(id)
    setTitle(title)
    setContent(content)
  }, [])
  const [id, setId] = useState()
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const router = useRouter()

  const { edit } = router.query

  return(
  <>
    <AppLayout>
      <AdminLayout>
        <TextRichWithNoSSR id= {id} title={title} content={content}/>
      </AdminLayout>
    </AppLayout>
  </>
  )
}

export default EditPageComponent;
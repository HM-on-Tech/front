import React from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../../components/AppLayout'
import TextRichWithNoSSR from "../../../components/textRichWithNoSSR"
import AdminLayout from '../../../components/AdminLayout'

const EditPageComponent = () => {
    const router = useRouter()

    const { edit } = router.query

    return(
    <>
      <AppLayout>
        <AdminLayout>
          <TextRichWithNoSSR title="hello" content="hhhhhhhh"/>
        </AdminLayout>
      </AppLayout>
    </>
    )
}

export default EditPageComponent;
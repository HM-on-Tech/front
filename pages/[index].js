import React from 'react'
import AppLayout from '../components/AppLayout'
import { useRouter } from 'next/router'

const heartComponent = () => {
    const router = useRouter()

    const { index } = router.query

    return(
    <>
    <AppLayout>
        {index}
    </AppLayout>
    </>
    )
}

export default heartComponent;
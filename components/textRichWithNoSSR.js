import dynamic from 'next/dynamic'
import AdminLayout from './AdminLayout'

const TextRichWithNoSSR = dynamic(() => import('./textRich'), {
  ssr: false
})

export default () => <TextRichWithNoSSR />

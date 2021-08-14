import dynamic from 'next/dynamic'
import AdminLayout from './AdminLayout'

const TextRichWithNoSSR2 = dynamic(() => import('./textRich'), {
  ssr: false
})

const TextRichWithNoSSR = () => <TextRichWithNoSSR2 />

export default TextRichWithNoSSR;

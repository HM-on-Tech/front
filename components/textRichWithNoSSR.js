import dynamic from 'next/dynamic'

const TextRichWithNoSSR2 = dynamic(() => import('./textRich'), {ssr: false})

const TextRichWithNoSSR = ({content, title, id}) => {
  return <TextRichWithNoSSR2 titleProp = {title} contentProp = {content} idProp = {id}/>
}

export default TextRichWithNoSSR;

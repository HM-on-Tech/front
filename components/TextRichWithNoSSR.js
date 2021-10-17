import dynamic from 'next/dynamic'

const TextRichWithNoSSR2 = dynamic(() => import('./TextRich'), {ssr: false})

const TextRichWithNoSSR = ({postInfo}) => {
  return <TextRichWithNoSSR2 postInfo={postInfo}/>
}

export default TextRichWithNoSSR;

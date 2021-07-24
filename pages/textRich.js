import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/textRich'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />
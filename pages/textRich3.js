import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/test3'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />
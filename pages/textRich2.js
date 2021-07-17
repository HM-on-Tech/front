import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/test2'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />

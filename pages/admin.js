import dynamic from 'next/dynamic'
import AdminLayout from '../components/AdminLayout'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/AdminLayout'), {
  ssr: false
})

export default () => < DynamicComponentWithNoSSR />


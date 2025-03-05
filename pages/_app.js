import '../styles/globals.css'
import '../pages/benefits/Layout.css'
import Layout from '../components/Layout'
import { usePathname } from 'next/navigation'
import IPSLayout from './benefits/IPSLayout'

function MyApp({ Component, pageProps }) {
  const pathName = usePathname();
  const isActive = pathName.startsWith('/benefits');

  if (isActive) {
    return (
      <IPSLayout>
        <Component {...pageProps} />
      </IPSLayout>
    )
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp

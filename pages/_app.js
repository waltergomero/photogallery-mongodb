import '@/styles/globals.css'
import AdminLayout from '../components/layout/admin'
import MainLayout from '../components/layout/main'

export default function App({ Component, pageProps }) {
  return (
 <MainLayout>
    <Component {...pageProps} />
  </MainLayout>
  )
}

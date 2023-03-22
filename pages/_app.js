import '@/styles/globals.css'
import Layout from '../components/Layout/main';

export default function MyApp({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };

  return renderWithLayout(<Component {...pageProps} />);
}

// import '@/styles/globals.css'
// import AdminLayout from '../components/layout/admin'
// import MainLayout from '../components/layout/main'

// export default function App({ Component, pageProps }) {
//   return (
//  <MainLayout>
//     <Component {...pageProps} />
//   </MainLayout>
//   )
// }

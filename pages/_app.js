import '@/styles/globals.css'
import AdminLayout from '@/components/layout/admin';
import Layout from '@/components/layout/main';

import { SessionProvider, useSession} from "next-auth/react";

const layouts = { Main : Layout,  Admin: AdminLayout,};

export default function App({Component,  pageProps: { session, ...pageProps },}) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <Layout>
      {Component.auth ? (
         <Auth>
          <Component {...pageProps} />
         </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      </Layout>
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

// import '@/styles/globals.css'
// import Layout from '@/components/Layout/main';
// import AdminLayout from '@/components/layout/admin';
// import { SessionProvider} from "next-auth/react";

// export default function App({ Component, pageProps: { session, ...pageProps }  }) {
//   return (
//     <SessionProvider session={session}>
//  <Layout>
//     <Component {...pageProps} />
//   </Layout>
//   </SessionProvider>
//   )
// }

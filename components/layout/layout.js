import Head from "next/head";
import Header from "./Header";
import Footer from "./footer";
import { Alert } from "../Alert";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-100 m-2">
          <Alert />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Kuntur Gallery",
  keywords:
    "Kuntuer,image, images, photo, photos, photogallery, imagegallery, fotos, imagenes",
  description: "The best place to view great images",
};

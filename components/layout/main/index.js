import Head from "next/head";
import NavBar from "../navbar";
import Footer from "../footer";
import { Alert } from "@/components/Alert";

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
        <NavBar />
        <main className="flex-1 bg-gray-800">
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

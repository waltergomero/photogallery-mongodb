import Head from "next/head";
import Sidebar from '../sidebar/index';
import { Alert } from "@/components/Alert";

export default function AdminLayout({
  title,
  keywords,
  description,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 border-2 border-blue-100">
        <Alert />
          {children}
        </div>
      </div>
    </>
  );
}
//AdminLayout.auth = true;
AdminLayout.defaultProps = {
  title: "Gallery Admin Page",
  keywords: "images, photos, photogallery, imagegallery",
  description: "The best place to view great images",
};

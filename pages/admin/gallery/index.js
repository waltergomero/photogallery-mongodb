import React from "react";
import GalleryGridPage from "./gallerygrid";
import { useRouter } from "next/router";

export default function PhotoGalleryPage() {
  const router = useRouter();

  const addImageHandler = () => {
    router.push("/admin/gallery/upload");
  };

  return (
    <>
      <button
        id="addphotos"
        onClick={addImageHandler}
        className="px-6 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-500 m-4"
      >
        Add Photos
      </button>
      <div className="mt-4">
        <GalleryGridPage />
      </div>
    </>
  );
}
PhotoGalleryPage.layout = "Admin";
PhotoGalleryPage.auth = true;

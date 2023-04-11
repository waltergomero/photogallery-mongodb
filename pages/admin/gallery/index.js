import React from "react";
import GalleryGridPage from "./gallerygrid";
import { useRouter } from "next/router";

export default function PhotoGalleryPage() {
  const router = useRouter();

  const addImageHandler = () => {
    router.push("/admin/gallery/upload");
  };

  const addMulitpleImageHandler = () => {
    router.push("/admin/gallery/uploadmultiple");
  };

  return (
    <>
      <button
        id="addphotos"
        onClick={addImageHandler}
        className="px-6 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-500 m-2"
      >
        Add Single Photo
      </button>
      <button
        id="addmultiplephotos"
        onClick={addMulitpleImageHandler}
        className="px-6 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-500 m-2"
      >
        Add Multiple Photos
      </button>
      <div className="m-2">
        <GalleryGridPage />
      </div>
    </>
  );
}
PhotoGalleryPage.layout = "Admin";
PhotoGalleryPage.auth = true;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { galleryService } from "@/services/gallery.service";
import { accountService } from "@/services/account.service";
import dynamic from "next/dynamic";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

export default function GalleryGridPage() {
  const router = useRouter();
  const [categoryid, setCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState(null);
  const [imageList, setImageList] = useState(null);

  const handleChangeCategory = (e) => {
    setCategoryId(e);
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    galleryService
      .getImagesByUserId(user_id, categoryid)
      .then((x) => setImageList(x));
  }, []);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {imageList &&
          imageList?.map((item) => (
            <div key={item._id} className="shadow-lg rounded-lg">
              <div className="w-84 h-72 relative">
                <Image
                  src={"/" + item.path_original}
                  fill
                  alt=""
                  className="rounded-tl-lg rounded-tr-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex justify-between">
                  <Link
                    href={`/admin/gallery/edit/${item._id}`}
                    className="rounded-full py-2 px-4 text-gray-500 text-sm"
                  ><div className="flex justify-between">
                    <FaPencilAlt/>  Edit
                    </div>
                  </Link>
                  <Link
                    href={`/admin/gallery/delete/${item._id}`}
                    className=" rounded-full py-2 px-4 text-red-500 text-sm"
                  ><div className="flex justify-between">
                    <FaTrashAlt /> Delete </div>
                  </Link>
                </div>
              <div className="pl-4">
                <h4 className="text-gray-700 text-sm font-semibold">
                  {item.title}
                </h4>
                <div className="flex flex-row  text-xs">
                  <p className="text-gray-500">{item.description}</p>
                </div>

              </div>
            </div>
          ))}
      </div>
    </>
  );
}
GalleryGridPage.layout = "Admin";
GalleryGridPage.auth = true;

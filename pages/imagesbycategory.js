import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";

import dynamic from "next/dynamic";
import Image from "next/image";

import axios from "axios";
import { NEXT_API_URL } from "@/config/index";

const baseUrl = `${NEXT_API_URL}/front`;

// const LightGallery = dynamic(() => import("lightgallery/react"), {
//   ssr: false,
// });

const onInit = () => {
  console.log("lightGallery has been initialized");
};
export default function ImagesByCategory(props) {
  const { images } = props;

  return (
    <>
      <main className="mx-auto max-w-[1960px]">
        <div className="columns-1 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
          <LightGallery
            mode="lg-fade"
            onInit={onInit}
            speed={500}
            plugins={[lgZoom]}
          >
            {images &&
              images?.map((item) => (
                <a
                  key={item._id}
                  href={"/" + item.path_original}
                  shallow
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                  <Image
                    alt={item.category_name}
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 cursor-pointer"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    src={"/" + item.path_original}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                  />
                </a>
              ))}
          </LightGallery>
        </div>
      </main>
    </>
  );
}

ImagesByCategory.layout = "Main";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const url = `${baseUrl}/${id}`;
  const { data: images } = await axios.get(url);
  return {
    props: { images },
  };
}

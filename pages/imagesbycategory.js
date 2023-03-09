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
                // <Image
                //   key={item.image_id}
                //   alt={item.category_name}
                //   className="mb-2 transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                //   src={"/" + item.path_original}
                //   width={720}
                //   height={480}
                //   sizes="(max-width: 640px) 100vw,
                //     (max-width: 1280px) 50vw,
                //     (max-width: 1536px) 33vw,
                //     25vw"
                // />
                <a key={item.image_id} href={"/" + item.path_original}>
                  <img
                    className="rounded-lg mb-2 cursor-pointer"
                    src={"/" + item.path_original}
                    alt={item.image_name}
                  />
                </a>
              ))}
          </LightGallery>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const url = `${baseUrl}/${id}`;
  const { data: images } = await axios.get(url);
  return {
    props: { images },
  };
}

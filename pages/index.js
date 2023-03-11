import { Inter } from "@next/font/google";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { frontService } from "@/services/front.service";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import Thumbnail from "lightgallery/plugins/thumbnail";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const [imageList, setImageList] = useState(null);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  useEffect(() => {
    frontService.getRandomImages().then((x) => setImageList(x));
  }, []);

  console.log("Index Page On refresh: ", imageList);
  return (
    <>
      <main className="mx-auto max-w-[1960px] p-1">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[570px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Image src="/indian.jpg" width={736} height={832} />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>

            <h1 className="mt-8 mb-4 text-base text-gray-500 font-bold uppercase tracking-widest">
              Life events photos
            </h1>
            <p className="max-w-[40ch] text-gray-500 sm:max-w-[32ch]">
              Just remember "Attitude is Everything..."
            </p>
            <a
              className=" z-10 mt-6 rounded-lg border border-gray-900 bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-900 hover:text-white md:mt-4"
              href="/bycategories"
              rel="noreferrer"
            >
              View photos by categories
            </a>
          </div>
          <LightGallery
            mode="lg-fade"
            onInit={onInit}
            speed={500}
            plugins={[Thumbnail, lgZoom]}
          >
            {imageList &&
              imageList?.map((item) => (
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

HomePage.layout = "Front";

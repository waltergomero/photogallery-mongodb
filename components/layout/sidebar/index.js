import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import SignIn from './signin';

import {
  BsArrowLeftShort,
  BsChevronDown,
  BsFillImageFill,
  BsHouseDoor,
} from "react-icons/bs";
import {
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import {FaUsers} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Gallery", icon: <BsFillImageFill />, path: "/admin/gallery" },
    {
      title: "Categories",
      icon: <AiOutlineFileText />,
      path: "/admin/category",
    },
    { title: "Status", icon: <RiDashboardFill />, path: "/admin/status" },
    { title: "Users", icon: <FaUsers />, path: "/admin/user" },
    // {
    //   title: "Services",
    //   spacing: true,
    //   icon: <AiOutlineMail />,
    //   path: "/services",
    // },
    // {
    //   title: "projects",
    //   icon: <BsReverseLayoutTextSidebarReverse />,
    //   path: "",
    //   submenu: true,
    //   submenuItems: [
    //     { title: "submenu 1", path: "/others/submenu1" },
    //     { title: "submenu 2" },
    //     { title: "submenu 3" },
    //   ],
    // },
  ];

  function handleClick() {
    setOpen(!open);
  }

  function handleSubmenuClick() {
    setSubmenuOpen(!submenuOpen);
  }

  return (
    <div
      className={`sticky top-0 bg-red-500 h-screen p-5 pt-8 ${
        open ? "w-60" : "w-20"
      } duration-300 relative `}
    >
      <BsArrowLeftShort
        className={`bg-white text-red-600 text-3xl
        rounded-full absolute -right-3 top-9 border border-red-500 cursor-pointer
        ${!open && "rotate-180"}`}
        onClick={handleClick}
      />
       <Link href="/admin">
      <div className="inline-flex">
       
        <BsHouseDoor className="text-white text-3xl rounded cursor-pointer block float-left ml-3 mr-2" />
        <h1
          className={`text-white origin-left font-medium text-lg duration-300 ${
            !open && "scale-0"
          }`}
        >
          Admin Page
        </h1>
      
      </div>
      </Link>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <Fragment key={index}>
            <li>
              <Link
                href={`${menu.path}`}
                alt=""
                className={`flex rounded-md p-2 cursor-pointer hover:bg-red-600 text-white text-sm  items-center gap-x-4  
                             ${menu.spacing ? "mt-9" : "mt-2"} 
                                       ${
                                         router.asPath == menu.path &&
                                         "bg-red-600 text-white"
                                       }`}
              >
                <span className="text-xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-sm flex-1 duration-300 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={handleSubmenuClick}
                  />
                )}
              </Link>
            </li>
            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <li key={index}>
                    <Link
                      href={`${submenuItem.path} `}
                      className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-red-600 rounded-md 
                                    ${
                                      router.asPath == submenuItem.path &&
                                      "bg-red-600 text-white"
                                    }`}
                    >
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
                
              </ul>
              
            )}
   
          </Fragment>
          
        ))}
        <br/>
        <SignIn/>
      </ul>

    </div>
  );
}

Sidebar.auth = true;

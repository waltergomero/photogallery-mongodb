import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { RiUser3Line, RiLogoutCircleLine } from "react-icons/ri";

export default function Component() {
  const { data: session, status } = useSession();
  if (session) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_email", session?.user.email);
      localStorage.setItem("user_id", session?.user._id);
      localStorage.setItem("isAdmin", session?.user.isAdmin);
    }

    return (
      <>
        {status === "loading" ? (
          "loading"
        ) : session?.user ? (
         <ul>
            <li>
              <Link className="flex rounded-md p-2 cursor-pointer hover:bg-red-600 text-white text-sm  items-center gap-x-4" href="#">
              <span className="text-xl block float-left">
                   <RiUser3Line />
                </span>{session?.user.first_name}'s profile
              </Link>
              </li>
              <li>
              <Link className="flex rounded-md p-2 cursor-pointer hover:bg-red-600 text-white text-sm  items-center gap-x-4" href="/api/auth/signout">
              <span className="text-xl block float-left">
                   <RiLogoutCircleLine />
                </span>  Sign Out
              </Link>
            </li>
            </ul>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
        <li className="mt-3 md:mt-0 md:ml-6">
          <Link className="text-white" href="/account/signin">
            Sign In
          </Link>
        </li>
    );
  }
}

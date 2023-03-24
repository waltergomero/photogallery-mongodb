import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

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
         
            <li>
              <Link className="text-white mr-2 ml-6" href="/api/auth/signout">
                Welcome {session?.user.first_name}!
              </Link>
              <Link className="text-white" href="/api/auth/signout">
                Sign Out
              </Link>
            </li>
        
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

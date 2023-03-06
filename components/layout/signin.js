import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

export default function Component() {
  const { data: session, status } = useSession();

  if (session) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_email", session?.user.email);
      localStorage.setItem("user_id", session?.user._id);
    }

    return (
      <>
        {status === "loading" ? (
          "loading"
        ) : session?.user ? (
          <>
            <Link className="text-white mr-2" href="/api/auth/signout">
              Welcome {session?.user.first_name}!
            </Link>
            <Link className="text-white" href="/api/auth/signout">
              Sign Out
            </Link>
          </>
        ) : (
          ""
        )}
      </>
    );
  } else {
    <Link className="text-white" href="/account/signin">
      Sign In
    </Link>;
  }
}

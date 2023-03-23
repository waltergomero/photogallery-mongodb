import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { userService } from "@/services/user.service";
import AdminLayout from "@/components/layout/admin";
import UserTablePage from "./userTable";

export default function UserPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  let userContent = "";

  if (users && users.length > 0) {
    userContent = <UserTablePage data={users} />;
  }
  else{
    userContent = <p className="p-2">No records were found.</p>;
  }

  return (
    <>
      {!users && <Spinner />}
      {userContent}
    </>
  );
}

UserPage.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

import Link from "next/link";

export default function UserTablePage(props) {
  const users = props.data;
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">
          Users
        </h5>
        <div>
          {isAdmin === "true" ? 
          <Link
            href="/admin/user/addedit"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add User
          </Link> : ""}
        </div>
        <table className="border text-center mt-2 mb-4">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                #
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                First Name
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                Last Name
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                Email
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                Admin?
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-2 border-r">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((u) => (
                <tr className="border-b" key={u._id}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                    {u._id}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {u.first_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {u.last_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {u.email}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {u.isAdmin === true? "Yes" : "No"}
                  </td>
                  {isAdmin === "true" ? 
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">               
                    <Link 
                      href={`/admin/user/edit/${u._id}`}
                      className="px-4 py-1 bg-blue-500 text-white font-medium text-xs  rounded"
                    >
                      Edit
                    </Link>
                    <span>&nbsp; </span>
                    <Link
                      href={`/admin/user/delete/${u._id}`}
                      className="px-4 py-1 bg-red-500 text-white font-medium text-xs  rounded"
                    >
                      Delete
                    </Link>
                  </td>  : ""}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

UserTablePage.layout = "Admin";
UserTablePage.auth = true;


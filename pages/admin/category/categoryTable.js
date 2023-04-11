import Link from "next/link";

export default function CategoryTablePage(props) {
  const categories = props.data;
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
          <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Categories
        </h5>
        <div>
          <Link
            href="/admin/category/addedit"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Category
          </Link>
        </div>
      <table className="border  mt-2 mb-4">
        <thead className=" border-b bg-gray-100">
          <tr>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">ID #</th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Category Name
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Status
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((c) => (
              <tr className="border-b" key={c._id}>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {c._id}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {c.category_name}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {c.status_name}
                </td>              
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  <Link
                    href={`/admin/category/edit/${c._id}`}
                    className="px-4 py-1 bg-blue-500 text-white font-medium text-xs rounded"
                  >
                    Edit
                  </Link>
                  <span>&nbsp; </span>
                  {isAdmin === "true" ? 
                  <Link
                    href={`/admin/category/delete/${c._id}`}
                    className="px-4 py-1 bg-red-500 text-white font-medium text-xs rounded"
                  >
                    Delete
                  </Link> : ""}
                </td> 
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
CategoryTablePage.layout = "Admin";
CategoryTablePage.auth = true;


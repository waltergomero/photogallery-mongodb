import Link from "next/link";
import AdminLayout from "@/components/layout/admin";

export default function CategoryTablePage(props) {
  const categories = props.data;

  return (
    <>
      <table className="border  mt-2 mb-4">
        <thead className=" border-b bg-gray-100">
          <tr>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">ID #</th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Category Name
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Parent Category Name
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
                  {c.parent_category_name}
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
                  <Link
                    href={`/admin/category/delete/${c._id}`}
                    className="px-4 py-1 bg-red-500 text-white font-medium text-xs rounded"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
CategoryTablePage.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
CategoryTablePage.auth = true;


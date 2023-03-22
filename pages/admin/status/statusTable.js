import React from "react";
import Link from "next/link";
import AdminLayout from "@/components/layout/admin";

const StatusTable = (props) => {
  const status = props.data;

  return (
    <>
      <table className="border text-center mt-2 mb-4">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">ID #</th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Status Name
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Status Type Id
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {status &&
            status.map((s) => (
              <tr className="border-b" key={s._id}>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {s._id}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {s.status_name}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {s.status_typeid}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  <Link
                    href={`/admin/status/edit/${s._id}`}
                    className="px-4 py-1 bg-blue-500 text-white font-medium text-xs uppercase rounded"
                  >
                    Edit
                  </Link>
                  <span>&nbsp; </span>
                  <Link
                    href={`/admin/status/delete/${s._id}`}
                    className="px-4 py-1 bg-red-500 text-white font-medium text-xs uppercase rounded"
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
};

StatusTable.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default StatusTable;
StatusTable.auth = true;


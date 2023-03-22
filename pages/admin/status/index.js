import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin";
import { statusService } from "@/services/status.service";
import { Spinner } from "@/components/Spinner";
import StatusTable from "./statusTable";
import Link from "next/link";

export default function StatusPage(props) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    statusService.getAll().then((x) => setStatus(x));
  }, []);

  let statusContent = <p className="p-2">No records were found.</p>;

  if (status && status.length > 0) {
    statusContent = <StatusTable data={status} />;
  }
  return (
    <>
      {!status && <Spinner />}
      <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Status
        </h5>
        <div>
          <Link
            href="/admin/status/addedit"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Status
          </Link>
        </div>
        {statusContent}
      </div>
    </>
  );
}
StatusPage.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
StatusPage.auth = true;

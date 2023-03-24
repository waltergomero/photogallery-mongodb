import { useState, useEffect } from "react";
import { statusService } from "@/services/status.service";
import { Spinner } from "@/components/Spinner";
import StatusTable from "./statusTable";
import Link from "next/link";

export default function StatusPage(props) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    statusService.getAll().then((x) => setStatus(x));
  }, []);

  let statusContent = "";

  if (status && status.length > 0) {
    statusContent = <StatusTable data={status} />;
  }
  else{
    statusContent = <p className="p-2">No records were found.</p>
  }
  return (
    <>
      {!status && <Spinner />}
      {statusContent}
    </>
  );
}
StatusPage.layout = "Admin";
StatusPage.auth = true;

import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { statusService } from "@/services/status.service";
import Delete from "../delete";
import AdminLayout from "@/components/layout/admin";

export default function DeletePage({ id }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    statusService
      .getById(id)
      .then((x) => setStatus(x))
      .catch(alertService.error);
  }, []);

  return <>{status ? <Delete status={status} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}

DeletePage.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
DeletePage.auth = true;

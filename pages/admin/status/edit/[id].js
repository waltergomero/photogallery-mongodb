import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { statusService } from "@/services/status.service";
import AddEditStatus from "../addedit";

function EditPage({ id }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    statusService
      .getById(id)
      .then((x) => setStatus(x))
      .catch(alertService.error);
  }, []);

  return <>{status ? <AddEditStatus status={status} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}

EditPage.layout = "Admin";
export default EditPage;
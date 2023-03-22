import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import AddEditPage from "../addedit";
import AdminLayout from "@/components/layout/admin";

export default function EditPage({ id }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    categoryService
      .getById(id)
      .then((x) => setCategory(x))
      .catch(alertService.error);
  }, []);

  return <>{category ? <AddEditPage category={category} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}


EditPage.getLayout = function(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

EditPage.auth = true;

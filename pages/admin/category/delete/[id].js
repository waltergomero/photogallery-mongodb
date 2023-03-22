import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import Delete from "../delete";
import AdminLayout from "@/components/layout/admin";

export default function DeletePage({ id }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    categoryService
      .getById(id)
      .then((x) => setCategory(x))
      .catch(alertService.error);
  }, []);

  return <>{category ? <Delete data={category} /> : <Spinner />}</>;
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

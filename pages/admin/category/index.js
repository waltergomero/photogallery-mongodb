import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { categoryService } from "@/services/category.service";
import CategoryTable from "./categoryTable";
import Link from "next/link";

export default function CategoryPage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    categoryService.getAll().then((x) => setCategories(x));
  }, []);

  let categoryContent = "";

  if (categories && categories.length > 0) {
    categoryContent = <CategoryTable data={categories} />;
  }
  else{
    categoryContent = <p className="p-2">No records were found.</p>;
  }
  return (
    <>
      {!categories && <Spinner />}
      {categoryContent} 
    </>
  );
}
CategoryPage.layout = "Admin";
CategoryPage.auth = true;


import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { categoryService } from "@/services/category.service";
import CategoryTable from "./categoryTable";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    categoryService.getAll().then((x) => setCategories(x));
  }, []);

  let categoryContent = <p className="p-2">No records were found.</p>;

  if (categories && categories.length > 0) {
    categoryContent = <CategoryTable data={categories} />;
  }
  return (
    <>
      {!categories && <Spinner />}
      <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Categories
        </h5>
        <div>
          <Link
            href="/admin/category/add"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Category
          </Link>
        </div>
        {categoryContent}
      </div>
    </>
  );
}
Categories.auth = true;
Categories.layout = "Admin";

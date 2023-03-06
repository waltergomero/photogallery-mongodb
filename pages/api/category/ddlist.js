import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Category from "@/models/Category";

export default apiHandler({
  get: categoryDDList,
});

async function categoryDDList(req, res) {
  db.connect();

  const query = {};
  const sort = { category_name: 1 };

  const data = await Category.find(query).sort(sort);
  db.disconnect();

  console.log("data sorted: ", data);
  return res.status(200).json(data);
}

//sort an array with json objects
//   const datasorted = data.sort((a, b) => {
//     if (a.category_name < b.category_name) {
//       return -1;
//     }
//   });

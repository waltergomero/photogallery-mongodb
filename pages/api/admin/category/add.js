import { apiHandler } from "@/helpers/api/api-handler";
import Category from "@/models/Category";
import db from "@/utils/db";

export default apiHandler({
  post: add,
});

async function add(req, res) {

  try{
  await db.connect();
  
  // check if status and type already exists
  const categoryExists = await checkIfCategoryExists(req.body.category_name);

  if (categoryExists) {
    await db.disconnect();
    throw `Category name "${req.body.category_name}" already exists`;
  } else {
    const newCategory = new Category({
      category_name: req.body.category_name,
      parent_category_id: null,
      status_id: req.body.status_id,
      status_name: req.body.status_name,
    });

    const category = await newCategory.save();

    await db.disconnect();
    return res.status(200).json(category);
  }
}
catch(error){
  throw error;
}
}

async function checkIfCategoryExists(_category_name) {
  const query = { category_name: _category_name };
  const projection = { category_name: 1 };
  return await Category.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

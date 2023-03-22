import Category from "@/models/Category";
import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const query = { _id: req.query.id };
  const projection = { _id: 1, category_name: 1, status_id: 1, status_name: 1 };
  
  try{
  db.connect();
  const category = await Category.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
  db.disconnect();

  if (!category) throw "Category Not Found";
  return res.status(200).json(category);
  }
    catch(error){
      res.status(error.response.status).send(error.response.data);
  }
}

async function update(req, res) {
  try{
  db.connect();
  // check if status and type already exists
  const categoryExists = await checkIfCategoryExists(req.body.category_name);

  if (categoryExists) {
    if (categoryExists._id != req.body._id) {
      throw `Category "${req.body.category_name}" already exists`;
    }
  }

  const query = {
    category_name: req.body.category_name,
    status_id: req.body.status_id,
    status_name: req.body.status_name,
  };

  const result = await Category.updateOne({ _id: req.body._id }, query);

  db.disconnect();
  return res.status(200).json(result);
  }
    catch(error){
      throw error;
  }
}

async function checkIfCategoryExists(_category_name) {
  const query = { category_name: _category_name };
  const projection = { _id: 1, category_name: 1, status_id: 1 };

  return await Category.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

async function _delete(req, res) {
  try{
  db.connect();
  const query = { _id: req.query.id };
  const delete_category = await Category.deleteOne(query);

  db.disconnect();
  return res.status(200).json(delete_category);
  }
    catch(error){
      throw error;
  }
}

import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Status from "@/models/Status";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const query = { _id: req.query.id };
  const projection = { _id: 1, status_name: 1, status_typeid: 1 };
  try{
  db.connect();
  const status = await Status.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
  db.disconnect();

  if (!status) throw "Status Not Found";
  return res.status(200).json(status);
  }
catch(error){
  throw error;
}
}

async function update(req, res) {
  try{
  db.connect();
  const statusExists = await checkIfStatusExists(
    req.body.status_name,
    req.body.status_typeid
  );

  if (statusExists) {
    if (statusExists._id != req.body._id) {
      throw `Status "${req.body.status_name}" already exists`;
    }
  }

  const query = {
    status_name: req.body.status_name,
    status_typeid: req.body.status_typeid,
  };
  const result = await Status.updateOne({ _id: req.body._id }, query);

  db.disconnect();
  return res.status(200).json(result);
}
catch(error){
  throw error;
}
}

async function checkIfStatusExists(_status_name, _status_typeid) {
  const query = { status_name: _status_name, status_typeid: _status_typeid };
  const projection = { status_name: 1, status_typeid: 1 };
  return await Status.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

async function _delete(req, res) {
  try{
  db.connect();
  const query = { _id: req.query.id };
  const delete_status = await Status.deleteOne(query);

  db.disconnect();
  return res.status(200).json(delete_status);
  }
  catch(error){
    throw error;
  }
}

const bcrypt = require("bcryptjs");

import { apiHandler } from "@/helpers/api/api-handler";
import { omit } from "@/helpers/api";
import db from "@/utils/db";
import User from "@/models/User";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const query = { _id: req.query.id };
  const projection = { _id: 1, first_name: 1, last_name: 1, email:1, password:1, isAdmin:1 };
  try{
  db.connect();
  const user = await User.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
  db.disconnect();

  if (!user) throw "User Not Found";

  return res.status(200).json(user);
  }
  catch(error){
    throw error
}

}

async function update(req, res) {
  
  // validate
  try{
    db.connect();
  const user = await User.findOne({
    email: req.body.email,
  });

  if(user)
  {
    if (user._id != req.body._id) 
      throw `User with the email "${req.body.email}" already exists`;
  }
  
  let admin = true;
  if(req.body.rbAdmin != "true")
    admin = false;

  const query = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    isAdmin: admin,
    };
    
    const result = await User.updateOne({ _id: req.body._id }, query);
    db.disconnect();
    return res.status(200).json(result);
}
catch(error){
  throw error;
}
}

async function _delete(req, res) {

  try{
  db.connect();
  const query = { _id: req.query.id };
  const delete_user = await User.deleteOne(query);

  db.disconnect();
  return res.status(200).json(delete_user);
  }
  catch(error){
    throw error;
  }
}

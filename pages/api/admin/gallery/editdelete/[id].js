import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Gallery from "@/models/Gallery";

const fs = require('fs')

export default apiHandler({
  get: getImageInfoById,
  put: update,
  delete: _delete
});

async function getImageInfoById(req, res) {
  const query = { _id: req.query.id };
  db.connect();
  const imageinfo = await Gallery.findOne(query).then((result) => {
    const data = JSON.parse(JSON.stringify(result));

    db.disconnect();
    return Promise.resolve(data);
  });

  if (!imageinfo) throw "Image Not Found";

  return res.status(200).json(imageinfo);
}

async function update(req, res) {
  const query = {
    title: req.body.title,
    category_id: req.body.category_id,
    category_name: req.body.category_name,
    description: req.body.description,
  };
  db.connect();
  const result = await Gallery.updateOne({ _id: req.body._id }, query);
  db.disconnect();
  return res.status(200).json(result);
}

async function _delete(req, res) {
  const query_id = { _id: req.query.id };
  db.connect();
  const imagepath = await Gallery.findOne(query_id)
  const imageToDelete = "/public/" + imagepath.path_original;
 // console.log("image path: ", imageToDelete);
 try{
   const result = await Gallery.deleteOne(query_id);
    // fs.unlinkSync(imageToDelete);
    db.disconnect();
    
    return res.status(200).json(result);
 }
 catch(err){
   throw new Error("This image was not deleted.")
 }



}

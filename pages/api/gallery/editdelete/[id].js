import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Gallery from "@/models/Gallery";

export default apiHandler({
  get: getImageInfoById,
  //put: update,
  //delete: _delete
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

// async function update(req, res) {

//     const { status_id, status_name, status_typeid } = req.body;
//     // validate
//     const query = "SELECT * FROM southwind.status WHERE status_name = $1 AND status_id <> $2";
//     const value = [status_name, status_id];

//     const status = await conn.query(query, value)
//     .then(result => {
//         const data = JSON.parse(JSON.stringify(result));
//         const s = data.rows[0];
//         return Promise.resolve(s);
//     });

//     if (status)
//         throw `Status "${status_name}" already exists`;

//     //usersRepo.update(req.query.id, params);
//     const query2 = "UPDATE southwind.status  SET status_name = $1, status_typeid = $2 WHERE status_id = $3";
//     const value2 = [status_name, status_typeid, status_id];
//     const results = await conn.query(query2, value2);
//     return res.status(200).json(results.rows);
// }

// async function _delete(req, res) {
//     const status_id = req.query.id;
//     const query = "DELETE FROM southwind.status  WHERE status_id = $1 ";
//     const value = [status_id];
//     const delete_status = await conn.query(query, value);

//     return res.status(200).json({});
// }

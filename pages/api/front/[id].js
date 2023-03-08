import db from "@/utils/db";
import Gallery from "@/models/Gallery";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getImagesByCategoryId(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

async function getImagesByCategoryId(req, res) {
  const query = {category_id: req.query.id};
  db.connect();
  const data = await Gallery.find(query) //"SELECT * FROM southwind.gallery WHERE category_id = $1;";
  db.disconnect();
  return res.status(200).json(data);
}

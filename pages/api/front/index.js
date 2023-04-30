import Gallery from "@/models/Gallery";
import db from "@/utils/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getRandomImages(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

async function getRandomImages(req, res) {
  db.connect();
  const images = await  Gallery.aggregate([ { $sample: { size: 10 } } ]); 
  //const images = await Gallery.find().sort({_id:-1}).limit(10);
  //console.log(images);
  db.disconnect();

  return res.status(200).json(images);
}

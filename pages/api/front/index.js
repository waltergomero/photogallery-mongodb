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
  const images = await Gallery.find({});
  db.disconnect();
  // const data = await Gallery.aggregate([
  //   {
  //     $lookup: {
  //       from: "categories", //collection to join
  //       localField: "category_id", //field from the input document (gallery)
  //       foreignField: "_id", //field from the documents of the "from" collection
  //       as: "category_info", //output array field
  //     },
  //   },
  // ]);

  return res.status(200).json(images);
}

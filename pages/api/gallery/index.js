import { apiHandler } from "@/helpers/api/api-handler";
import Gallery from "@/models/Gallery";
import db from "@/utils/db";

export default apiHandler({
  get: imageList,
});

async function imageList(req, res) {
  //const userid = req.query.userid;
  let category_id = "0";
  let query = "{}";

  if (req.query.categoryid != category_id) {
    query = { user_id: req.query.userid, category_id: req.query.categoryid };
  } else {
    query = { user_id: req.query.userid };
  }

  db.connect();
  const images = await Gallery.find(query);

  db.disconnect();

  return res.status(200).json(images);
}

import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Category from "@/models/Category";

export default apiHandler({
  get: statusList,
});

async function statusList(req, res) {
  await db.connect();
  const data = await Category.find({});
  await db.disconnect();
  //res.send(data);

  return res.status(200).json(data);
}

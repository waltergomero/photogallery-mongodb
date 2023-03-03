import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Status from "@/models/Status";

export default apiHandler({
  get: statusList,
});

async function statusList(req, res) {
  await db.connect();
  const data = await Status.find({});
  await db.disconnect();
  res.send(data);

  //return res.status(200).json(data);
}

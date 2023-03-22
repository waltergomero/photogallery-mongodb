import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Status from "@/models/Status";

export default apiHandler({
  get: statusDDList,
});

async function statusDDList(req, res) {
  const projection = { status_typeid: 0, createdAt: 0, updatedAt: 0 };
  try{
  db.connect();
  const data = await Status.find({}, projection);
  db.disconnect();
  return res.status(200).json(data);
  }
  catch(error){
    throw error;
  }
  }

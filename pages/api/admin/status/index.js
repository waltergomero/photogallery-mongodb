import { apiHandler } from "@/helpers/api/api-handler";
import db from "@/utils/db";
import Status from "@/models/Status";

export default apiHandler({
  get: statusList,
});

async function statusList(req, res) {
  try{
  await db.connect();

  const data = await Status.find({}).sort({status_name: 1});
  await db.disconnect();
  return res.status(200).json(data);
  }
  catch(error){
    throw error;
  }
  
}

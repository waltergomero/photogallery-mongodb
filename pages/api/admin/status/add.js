import { apiHandler } from "@/helpers/api/api-handler";
import Status from "@/models/Status";
import db from "@/utils/db";

export default apiHandler({
  post: add,
});

async function add(req, res) {
 
  try{
  await db.connect();

  // check if status and type already exists
  const statusExists = await checkIfStatusExists(
    req.body.status_name,
    req.body.status_typeid
  );

  if (statusExists) {
    await db.disconnect();
    throw `Status name "${req.body.status_name}" already exists`;
  } else {
    const newStatus = new Status({
      status_name: req.body.status_name,
      status_typeid: req.body.status_typeid,
    });

    const status = await newStatus.save();

    await db.disconnect();
    return res.status(200).json(status);
    }
  }
  catch(error){
    throw error;
  }
}

async function checkIfStatusExists(_status_name, _status_typeid) {
  const query = { status_name: _status_name, status_typeid: _status_typeid };
  const projection = { status_name: 1, status_typeid: 1 };
  return await Status.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

import { apiHandler } from "@/helpers/api/api-handler";
import User from "@/models/User";
import db from "@/utils/db";

export default apiHandler({
  get: getuserid,
});

async function getuserid(req, res) {
  db.connect();
  // get user id
  const userid = await checkIfEmailExists(req.query.email);

  if (!userid) {
    throw `User with the email "${email}" do not exists`;
  }
  db.disconnect();

  if (userid) {
    return res.status(200).json(userid);
  } else {
    return null;
  }
}

async function checkIfEmailExists(_email) {
  const query = { email: _email };
  const projection = { _id: 1 };
  return await User.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

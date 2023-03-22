import { apiHandler} from '@/helpers/api/api-handler';
import db from '@/utils/db';
import User from '@/models/User';

export default apiHandler({
    get: getUsers
});

async function getUsers(req, res) {
    try{
        await db.connect();
      
        const data = await User.find({}).sort({last_name: 1});
        await db.disconnect();
        return res.status(200).json(data);
        }
    catch(error){
          res.status(error.response.status).send(error.response.data);
        }
}

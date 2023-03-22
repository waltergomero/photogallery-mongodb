const bcrypt = require('bcryptjs');
import { apiHandler } from '@/helpers/api/api-handler';
import db from '@/utils/db';
import User from '@/models/User';

export default apiHandler({
    post: register
});

async function register(req, res) {
    db.connect()
    try{
    // validate
    const user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        throw new Error("User with this email already exists.");
      }
      else {
        let admin = true;
        if(req.body.rbAdmin != "true")
          admin = false;

        // hash password
        const password = bcrypt.hashSync(req.body.password, 10);   
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: password,
          isAdmin: admin,
        });
    
        const user = await newUser.save();
    
        await db.disconnect();
        return res.status(200).json(user);
        }
    }
    catch(error)
    {
        throw error;
    }

    
}


import Category from "@/models/Category";
import Gallery from "@/models/Gallery";
import Status from "@/models/Status";
import User from "@/models/User";
import data from "@/utils/data";
import db from "@/utils/db";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Category.deleteMany();
  await Category.insertMany(data.category);
  await Status.deleteMany();
  await Status.insertMany(data.status);
  await Gallery.deleteMany();
  await Gallery.insertMany(data.gallery);

  await db.disconnect();
  res.send({ message: "seeded successfully" });
};
export default handler;

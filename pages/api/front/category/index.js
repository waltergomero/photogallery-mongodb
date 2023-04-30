import db from "@/utils/db";
import Collection from "@/models/Collection";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await imagesByCategory(req, res);
    case "POST":
      return await saveProduct(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

async function imagesByCategory(req, res) {
  const query = {};
  const projection = {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  };

  db.connect();
  const data = await Collection.find(query, projection);
  db.disconnect();
  console.log("data collected: ", data);
  return res.status(200).json(data);
}

// import { conn } from '@/utils/dbconnection';

// export default apiHandler({
//     get: getCategories
// });

// async function getCategories(req, res) {
//     console.log("land here:", req)
//     const query = "SELECT c.category_id, c.category_name, c.parent_category_id, c2.category_name as parent_category_name, s.status_name FROM southwind.categories c\
//     LEFT JOIN southwind.categories c2 ON c.parent_category_id = c2.category_id  INNER JOIN southwind.status s ON c.status_id = s.status_id ORDER BY c.category_name;";

//    const response = await conn.query(query);
//    console.log("returned data:", response)
//     return res.status(200).json(response.rows);
// }

// export default async function handler(req, res) {
//     switch (req.method) {
//       case "GET":
//         return await getProducts(req, res);
//       case "POST":
//         return await saveProduct(req, res);
//       default:
//         return res.status(400).send("Method not allowed");
//     }
//   }

//   const getProducts = async (req, res) => {
//     try {
//       console.log("hello");
//       const results = await sql_query({
//           query: "SELECT * FROM amazonas.products;",
//           values:[],
//       })
//       console.log("passed results: ", results);
//       return res.status(200).json(results);
//       }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ error });
//       }
//   };

//   const saveProduct = async (req, res) => {
//     try {
//       const { name, description, price } = req.body;

//       const result = await sql_query("INSERT INTO product SET ?", {
//         name, description, price,
//       });

//       return res.status(200).json({ ...req.body, id: result.insertId });
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   };

import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      first_name: "Walter",
      last_name: "Gomero",
      email: "walter.gomero@gmail.com",
      password: bcrypt.hashSync("C#luisa1961"),
      isAdmin: true,
    },
  ],
  status: [
    {
      status_name: "Active",
      status_typeid: 0,
    },
    {
      status_name: "Inactive",
      status_typeid: 0,
    },
  ],
  category: [
    {
      category_name: "Ollantaytambo",
      parent_category_id: 0,
      status_id: 1,
      notes: "",
    },
    {
      category_name: "Ausangate Mountain",
      parent_category_id: 0,
      status_id: 1,
      notes: "",
    },
  ],
};

export default data;

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
      parent_category_id: null,
      status_id: "6407d9f31c0994d76e380728",
      notes: null,
    },
    {
      category_name: "Ausangate Mountain",
      parent_category_id: null,
      status_id: "6407d9f31c0994d76e380728",
      notes: null,
    },
  ],
  gallery: [
    {
      image_name: "1677970154677.JPG",
      category_id: "6402afc528396936a71e72b6",
      category_name: "test",
      user_id: "6402afc428396936a71e72b2",
      email: "walter.gomero@gmail.com",
      path_original: "gallery/6402afc428396936a71e72b2/1677970154677.JPG",
      path_reduced: "gallery/6402afc428396936a71e72b2/1677970154677.JPG",
      description: "Test data",
      islandscape: true,
      title: "test data",
      width: 1290,
      height: 967,
    },
  ],
};

export default data;

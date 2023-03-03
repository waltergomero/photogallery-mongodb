import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    parent_category_id: { type: Number, required: true },
    status_id: { type: Number, required: true },
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;

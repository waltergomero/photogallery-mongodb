import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image_name: { type: String, required: true },
    category_id: { type: String, required: true },
    user_id: { type: String, required: true },
    path_original: { type: String, required: true },
    path_reduced: { type: String, required: true },
    description: { type: String, required: true },
    islanscape: { type: Boolean, required: true },
    title: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
export default Gallery;

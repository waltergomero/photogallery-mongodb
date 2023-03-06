import { IncomingForm } from "formidable";
import path from "path";
import db from "@/utils/db";
import Gallery from "@/models/Gallery";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const asynParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("gallery add: ", req);
    const result = await asynParse(req);
    console.log("images", result);
    var _path = create_folder(result.fields.user_id);

    const user_id = result.fields.user_id;
    const category_id = result.fields.category_id;
    const title = result.fields.title;
    const description = result.fields.description;
    const preImageName = result.files.image.originalFilename;
    const ext = "." + result.fields.extension;

    var date = new Date();
    const unixTimestamp = Math.floor(date.getTime());

    const imageName = unixTimestamp + ext;

    const oldPath = result.files.image.filepath;
    const newPath = _path + "/" + imageName;

    mv(oldPath, newPath, function (err) {});

    const updatedPath = removeFirstWord(newPath);

    var sizeOf = require("image-size");
    var dimensions = sizeOf(oldPath);
    var width = dimensions.width;
    var height = dimensions.height;
    var islandscape = true;
    if (dimensions.height > dimensions.width) islandscape = false;

    const addPhotoToGallery = new Gallery({
      image_name: imageName,
      category_id: category_id,
      user_id: user_id,
      path_original: updatedPath,
      path_reduced: updatedPath,
      description: description,
      islandscape: islandscape,
      title: title,
      width: width,
      height: height,
    });

    console.log("addPhotoToGallery: ", addPhotoToGallery);
    db.connect();
    const data = await addPhotoToGallery.save();

    db.disconnect();

    return res.status(200).json(data);
  }
}

function create_folder(userid) {
  const fs = require("fs");
  const dir = "public/gallery/" + userid;
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf("/");

  if (indexOfSpace === -1) {
    return "";
  }

  return str.substring(indexOfSpace + 1);
}

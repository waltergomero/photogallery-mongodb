import React, { Component } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Compressor from "compressorjs";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";

export default function UploadMultiple() {
  const router = useRouter();
  const [imageExtension, setImageExtension] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [ddlist, setDDList] = useState(null);
  const [selCategoryValue, setSelCategoryValue] = useState("");
  const [selCategoryName, setSelCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    setErrorMessage(false);
    categoryService.getDDList().then((x) => setDDList(x));
  }, []);

  const validationSchema = Yup.object().shape({
    _id: Yup.string().required("Category selection is required."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const uploadImagesHandler = (e) =>{
    setSelectedFiles(Array.from(e.target.files))
  }

  const handleCompressedUpload = (e) => {
    const image = e
    const ext = image.name.substr(image.name.lastIndexOf(".") + 1);

    setImageExtension(ext);

    new Compressor(image, {
      quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
      maxWidth: 1290,
      maxHeight: 1290,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      },
    });
  };

  async function onSubmit(data) {
    console.log("array:", selectedFiles);
    const userid = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    if (selectedFiles != null) {
      selectedFiles.map((image, index) => {
      handleCompressedUpload(image);
      const formdata = new FormData();
      formdata.append("user_id", userid);
      formdata.append("email", email);
      formdata.append("category_id", selCategoryValue);
      formdata.append("category_name", selCategoryName);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("image", compressedFile);
      formdata.append("extension", imageExtension);
      axios.post("/api/admin/gallery/add", formdata);

      alertService.success("Images were added successfully.", {
        keepAfterRouteChange: true,
      
      });
    })
      return router.push("/admin/gallery");
    } else {
      setErrorMessage(true);
    }
  }

  const removeSelectedImage = (e) => {
    let _name = e.target.attributes['data-key'].value;
    setSelectedFiles(image => image.filter(x => x.name != _name))
  };

  const handleCategoryChange = (e) => {
    setSelCategoryName(e.target.options[e.target.selectedIndex].text);
    setSelCategoryValue(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <div className="flex h-full flex-col m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input type="file" multiple onChange={uploadImagesHandler} />
                {errorMessage && (
                  <div className="invalid-feedback text-sm font-small  text-red-500">
                    Please upload an image.
                  </div>
                )}
              </div>
              <div>
                <select
                  name="_id"
                  placeholder="Select a category"
                  {...register("_id")}
                  className="px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleCategoryChange}
                  value={selCategoryValue}
                >
                  <option value="">Select a category</option>
                  {ddlist &&
                    ddlist.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.category_name}
                      </option>
                    ))}
                </select>
                <div className="invalid-feedback text-sm font-small text-red-500">
                  {errors._id?.message}
                </div>
              </div>
              <div className=" mt-2 mb-4">
              <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">  
              {selectedFiles && selectedFiles?.map((file,index) => (  
                            <img  key={index}
                            className="rounded-md"
                              data-key={file.name}
                              onClick = {removeSelectedImage}                                 
                              src={URL.createObjectURL(file)} alt="uploaded Images" />                                                                                                                                                      
                  ))}
              </div>
              </div>
              <div className="px-4 py-1 text-left sm:px-6">
                <button
                  id="cancel"
                  onClick={handleCancel}
                  className="px-6  text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <span>&nbsp; </span>
                <button
                  disabled={formState.isSubmitting}
                  className="px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  Save{" "}
                </button>
              </div>
            </form>
          </div>
    </>
  );
}
UploadMultiple.layout = "Admin";
UploadMultiple.auth = true;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Input_Display = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=tseQLucxq_qfiPftY1zldz0K65FXaLzzq08rKrXgIqc`
      );
      console.log(response.data.results);
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">
          Image Editor App
        </h1>
        <div className="mb-4 flex gap-2 justify-center items-center">
          <input
            type="text"
            className="border p-2  w-full"
            placeholder="Search for images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={fetchImages}
            className="bg-blue-500 text-white p-2 "
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 p-2">
        {images.map((image) => (
          <div key={image.id} className="border border-orange-500 p-2">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-[21rem] h-60"
            />
            <Link
              to={`/Add_Caption/${encodeURIComponent(image.urls.small)}`}
              className="bg-orange-500 text-white p-2  mt-2 w-full block text-center"
            >
              Add Captions
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Input_Display;

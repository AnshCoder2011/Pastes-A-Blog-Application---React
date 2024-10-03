import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const handleCreate = () => {
    const paste = {
      title,
      content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setContent("");
    setSearchParams({});
  };

  const handleSearch = () => {
    setSearchParams({ title, content });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-400">
          {pasteId ? "Update Your Paste" : "Create New Paste"}
        </h1>
        <div className="space-y-6">
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-64 resize-none"
            placeholder="Enter Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCreate}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

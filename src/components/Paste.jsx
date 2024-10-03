import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromPastes,
  updateToPastes,
  addToPastes,
  resetAllPastes,
} from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaCopy,
  FaShare,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaUndo,
} from "react-icons/fa";

const Paste = () => {
  const { pastes } = useSelector((state) => state.paste);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paste, setPaste] = useState(null);
  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
  };

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/paste/${id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  const handleEdit = (paste) => {
    dispatch(updateToPastes(paste));
    navigate("/");
  };

  const handleView = (id) => {
    navigate(`/paste/${id}`);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
        My Pastes
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="&#9906; Search pastes by title or content..."
          className="w-full p-2 rounded-lg border-2 border-indigo-600 bg-gray-800 text-white focus:outline-none focus:border-indigo-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-indigo-400">
                  {paste.title}
                </h2>
                <p className="text-gray-300 mb-4">
                  {paste.content.substring(0, 100)}...
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-700">
                <button
                  onClick={() => handleCopy(paste.content)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <FaCopy className="text-xl" />
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="text-green-400 hover:text-green-300"
                >
                  <FaShare className="text-xl" />
                </button>
                <button
                  onClick={() => handleView(paste._id)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <FaEye className="text-xl" />
                </button>
                <button
                  onClick={() => handleEdit(paste)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={() => dispatch(removeFromPastes(paste._id))}
                  className="text-red-400 hover:text-red-300"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400">
            No pastes found matching your search.
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center space-x-6">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-500 hover:scale-110 flex items-center"
        >
          <FaPlus className="mr-2 text-xl" /> Create New Paste
        </button>
        <button
          onClick={() => dispatch(resetAllPastes())}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-500 hover:scale-110 flex items-center"
        >
          <FaUndo className="mr-2 text-xl" /> Reset All Pastes
        </button>
      </div>
    </div>
  );
};

export default Paste;

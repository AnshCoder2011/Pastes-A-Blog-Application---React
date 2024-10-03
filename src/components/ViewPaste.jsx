import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ViewPaste = () => {
  const { id } = useParams()
  const { pastes } = useSelector((state) => state.paste)
  const paste = pastes.find((p) => p._id === id)

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content)
      toast.success("Content copy ho gaya clipboard mein!")
    }
  }

  if (!paste) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-indigo-400">Oops! Ye paste nahi mila</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-400">{paste.title}</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <pre className="whitespace-pre-wrap">{paste.content}</pre>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Created: {new Date(paste.createdAt).toLocaleString()}</p>
          <button 
            onClick={handleCopy}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Copy Content
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste
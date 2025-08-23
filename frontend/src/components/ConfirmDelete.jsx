import React, { useState } from "react";

function ConfirmDelete({ open, onClose, onConfirm,storyId }) {
  if (!open) return null;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true); // disable button
    try {
      await onConfirm(storyId); // pass storyId
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-80 text-center'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>
          Confirm Delete
        </h2>
        <p className='text-sm text-gray-600 mb-6'>
          Are you sure you want to delete this story?
        </p>

        <div className='flex justify-center gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;

import React, { useEffect, useState } from "react";
import useAuthStore from "../context/AuthContext";
import Navbar from "./Navbar";
import { BookOpen } from "lucide-react";
import { Heart, Edit, Trash2, Plus } from "lucide-react";
import Loading from "./Loading";
import ApiClient from "../service/apiClient";
import { toast } from "sonner";
import ConfirmDelete from "./ConfirmDelete";
import TravelUploadComponent from "./TravelUploadComponent";

function UserStory() {
  const { userStories, fetchUserStories, isLoading, hasFetched } =
    useAuthStore();

  const [openPopup, setOpenPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingStory, setEditingStory] = useState(null);

  const [openUpload, setOpenUpload] = useState(false);

  useEffect(() => {
    if (hasFetched === false) {
      fetchUserStories();
    }
  }, [userStories]);

  if (isLoading) {
    return <Loading />;
  }

  const handeldelete = async () => {
    try {
      const response = await ApiClient.deleteUserStory(deleteId);

      if (response) {
        fetchUserStories();
        toast.success("Story deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
      toast.error("Failed to delete story. Please try again.");
    } finally {
      setOpenPopup(false);
      setDeleteId(null);
    }
  };

  if (userStories.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <Navbar />

        <div className='flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md text-center'>
            <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 mb-8'>
              <BookOpen className='h-12 w-12 text-blue-600' />
            </div>

            <h1 className='text-3xl font-bold tracking-tight text-gray-900 mb-4'>
              No Stories Yet
            </h1>

            <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
              Your story collection is waiting to be filled with amazing tales.
              Start your journey by creating your first story!
            </p>

            <div className='mt-16 grid grid-cols-3 gap-4 opacity-60'>
              <div className='h-2 bg-blue-200 rounded-full'></div>
              <div className='h-2 bg-purple-200 rounded-full'></div>
              <div className='h-2 bg-pink-200 rounded-full'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 '>
        {userStories.map((story) => (
          <div
            key={story._id}
            className='bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 mb-6 sm:mb-8 overflow-hidden group'
          >
            <div className='flex flex-col md:flex-row'>
              <div className='relative md:w-2/5 lg:w-2/5 aspect-[4/3] overflow-hidden'>
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute top-3 left-3 sm:top-5 sm:left-5'>
                  <span className='px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r text-xs sm:text-sm font-semibold text-gray-400 rounded-full shadow-lg backdrop-blur-sm border border-white/20'>
                    Travel
                  </span>
                </div>
              </div>

              <div className='p-4 sm:p-6 lg:p-8 md:w-3/5 lg:w-3/5 flex flex-col justify-between'>
                <div>
                  <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 transition-all duration-300 cursor-pointer leading-tight'>
                    {story.title
                      ? story.title.replace(/^"|"$/g, "")
                      : "No Title"}
                  </h2>
                  <div className='flex items-center mb-3 sm:mb-5'>
                    <div className='w-2 h-2 bg-gradient-to-r from-black to-white rounded-full mr-3'></div>
                    <p className='text-slate-600 font-semibold text-sm sm:text-base lg:text-lg'>
                      By:{" "}
                      {story.userId?.fullName
                        ? story.userId.fullName.replace(/^"|"$/g, "")
                        : "Unknown"}
                    </p>
                  </div>
                  <p className='text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-medium'>
                    {story.story
                      .replace(/^"|"$/g, "")
                      .split(" ")
                      .slice(0, 6)
                      .join(" ") + "..."}
                  </p>
                  {story.tags && story.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6'>
                      {story.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-xs sm:text-sm font-semibold text-slate-700 rounded-full shadow-md border border-slate-300/50 hover:shadow-lg hover:scale-105 transition-all duration-200'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className='flex justify-between items-center mt-3 sm:mt-4'>
                  <div className='text-xs sm:text-sm text-slate-500 font-medium'>
                    Click to read more ...
                  </div>
                  <div className='flex items-center gap-2 sm:gap-3'>
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setEditingStory(story);
                        setOpenUpload(true);
                      }}
                      className='p-2 sm:p-3 rounded-full bg-blue-500/20'
                      title='Edit Story'
                    >
                      <Edit className='w-4 h-4' />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setDeleteId(story._id);
                        setOpenPopup(true);
                      }}
                      className='p-2 sm:p-3 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-300/30 hover:bg-red-500/30 active:scale-95 transition-all duration-200 group/delete'
                      title='Delete Story'
                    >
                      <Trash2 className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600 transition-all duration-300 group-hover/delete:scale-110' />
                    </button>

                    {/* Like Button */}
                    <button
                      disabled={true}
                      className='p-2 sm:p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 active:scale-95 group/heart disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <Heart
                        className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-all duration-300 group-hover/heart:scale-110 fill-red-500 text-red-500 drop-shadow-lg`}
                      />
                      <p className='text-xs sm:text-sm text-slate-600 mt-1'>
                        {story.likes.length}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setEditingStory(null);
          setOpenUpload(true);
        }}
        className='fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition'
      >
        <Plus className='w-6 h-6' />
      </button>

      <ConfirmDelete
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        onConfirm={handeldelete}
        storyId={deleteId}
      />

      {openUpload && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4'>
          <div className='bg-white rounded-xl shadow-lg w-full max-w-2xl h-auto max-h-[90vh] overflow-y-auto relative p-4 sm:p-6'>
            <button
              onClick={() => setOpenUpload(false)}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
            >
              ✕
            </button>

            <TravelUploadComponent
              editData={editingStory}
              onUploadSuccess={() => {
                setOpenUpload(false);
                fetchUserStories();
              }}
              onClose={() => setOpenUpload(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserStory;
